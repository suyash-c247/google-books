import axios from "axios";
import stringify from "json-stringify-safe";
import { message } from "../common/messages.js";
import searchKayModels from "../databsase/models/searchKayModels.js";
/**
 * Search and get google books
 * @param { req, res }
 * @returns JsonResponse
 */
export const search = async (req, res) => {
  try {
    const { providerId } = req;
    const { search = "" } = req.query;

    const bookList = await axios.get(`${process.env.BOOK_SEARCH_URL}${search}`);
    const bookLists = stringify(bookList.data.items);

    const user = await searchKayModels.findOne({ providerId });
    console.log("userProviderId",providerId)

    console.log("user",user)
    // in search key collection user not found
    if (!user) {
      await searchKayModels.create({
        providerId: providerId,
        search: [
          {
            key: search,
            count: 1,
          },
        ],
      });
    } else {
      const isSearchKey = await searchKayModels.findOne(
        { providerId: user.providerId },
        {
          search: { $elemMatch: { key: search } },
        }
      );
      let getCount;
      isSearchKey.search.map((data) => {
        getCount = data.count;
      });
      if (isSearchKey.search.length === 0) {
        await searchKayModels.findOneAndUpdate(
          { providerId: user.providerId },
          {
            $push: {
              search: {
                key: search,
                count: 1,
              },
            },
          },
          { new: true }
        );
      } else {
        const setSeach = {
          key: search,
          count: getCount + 1,
        };
        await searchKayModels.findOneAndUpdate(
          { "search.key": search },
          { $set: { "search.$": setSeach } },
          { new: true }
        );
      }
    }

    return res.status(200).json({
      data: JSON.parse(bookLists),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};

/**
 * Get details google book
 * @param { req, res }
 * @returns JsonResponse
 */
export const details = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const bookList = await axios.get(`${process.env.BOOK_DETAILS_URL}${id}`);
    const bookLists = stringify(bookList.data);

    return res.status(200).json({
      data: JSON.parse(bookLists),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: message.ERROR_MESSAGE,
    });
  }
};
