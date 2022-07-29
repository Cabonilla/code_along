import type { NextApiRequest, NextApiResponse } from "next";

export default async function getSnippets(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json({snippet: "Here's a snippet."})
} 