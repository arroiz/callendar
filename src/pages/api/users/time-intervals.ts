import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { buildAuthOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekday: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, buildAuthOptions(req, res));

  if (!session) {
    return res.status(401).end();
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body);

  Promise.all(
    intervals.map((interval) =>
      prisma.userTimeInterval.create({
        data: {
          time_end_in_minutes: interval.endTimeInMinutes,
          time_start_in_minutes: interval.startTimeInMinutes,
          weekday: interval.weekday,
          user_id: session.user.id,
        },
      })
    )
  );

  await prisma.userTimeInterval.create;

  return res.status(201).end();
}
