import { db } from "../database/postgres";

const truncNum = (num, limit = 2) => parseFloat(num.toFixed(limit));

export const dashboardStatistics = async () => {
  const report = await db.history.count({
    where: { NOT: { status: "REMOVED" } },
  });
  const player = await db.user.count();
  const admin = await db.admin.count();
  return { report, player, admin };
};
