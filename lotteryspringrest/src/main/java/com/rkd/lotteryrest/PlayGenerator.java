package com.rkd.lotteryrest;

import java.util.*;
import java.util.stream.IntStream;

public class PlayGenerator
{
  private final int numBuckets = 5;
  private final int[] mainBalls;
  private final int[] bonusBalls;
  private final Random rnd;
  private final String game;

  public PlayGenerator(String game, int maxMainBall, int maxBonusBall)
  {
    this.game = game;
    mainBalls = IntStream.rangeClosed(1, maxMainBall).toArray();
    bonusBalls = IntStream.rangeClosed(1, maxBonusBall).toArray();
    rnd = new Random(new Date().getTime());
  }

  private void randomizeArray(int[] sourceArray)
  {
    for (int i = 0; i < sourceArray.length; i++)
    {
      int j = rnd.nextInt(sourceArray.length);
      int temp = sourceArray[i];
      sourceArray[i] = sourceArray[j];
      sourceArray[j] = temp;
    }
  }

  private void randomizeBalls(int[] ballArray)
  {
    List<List<Integer>> bucketList = new ArrayList<>();
    for (int i = 0; i < numBuckets; i++)
    {
      bucketList.add(new ArrayList<>());
    }
    randomizeArray(ballArray);
    for (int i = 0; i < ballArray.length; i++)
    {
      bucketList.get(i % numBuckets).add(ballArray[i]);
    }
    int copyToIndex = 0;
    for (List<Integer> bucket : bucketList)
    {
      int[] bucketArr = bucket.stream().mapToInt(Integer::intValue).toArray();
      randomizeArray(bucketArr);
      System.arraycopy(bucketArr, 0, ballArray, copyToIndex, bucketArr.length);
      copyToIndex += bucketArr.length;
    }
    randomizeArray(ballArray);
  }

  public Play[] getPlays(int numPlays)
  {
    Play[] plays = new Play[numPlays];
    for (int i = 0; i < numPlays; i++)
    {
      randomizeBalls(mainBalls);
      randomizeBalls(bonusBalls);
      int[] balls = Arrays.copyOfRange(mainBalls, 0, 5);
      int bonus = bonusBalls[0];
      plays[i] = new Play(game, balls, bonus);

    }
    return plays;
  }

}
