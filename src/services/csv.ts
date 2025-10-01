import { Readable } from "stream";
import csv from "csv-parser";

export const readCsv = (file): Promise<any[]> => {
  const results: any[] = [];
  const stream = Readable.from(file.buffer);

  return new Promise<any[]>((resolve, reject) => {
    stream
      .pipe(csv({ separator: "," }))
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};
