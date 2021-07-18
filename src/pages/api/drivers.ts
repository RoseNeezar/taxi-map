import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { IFetchDriver } from "../../app/utils/type";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IFetchDriver>
) => {
  const data = req.query;
  try {
    const result = await axios.get(
      "https://qa-interview-test.splytech.dev/api/drivers",
      {
        params: {
          ...data,
        },
      }
    );
    res.status(200).json(result.data);
  } catch (error) {
    res.status(401).json(error);
  }
};
