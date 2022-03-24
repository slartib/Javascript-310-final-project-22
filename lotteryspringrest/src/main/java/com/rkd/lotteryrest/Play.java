package com.rkd.lotteryrest;

import java.util.Arrays;

public class Play
{
  private final String game;
  private final int[] ballArray;
  private final int bonusBall;

  public Play(String game, int b1, int b2, int b3, int b4, int b5, int bonus)
  {
    this.game = game;
    ballArray = new int[]{b1, b2, b3, b4, b5};
    Arrays.sort(ballArray);
    bonusBall = bonus;
  }

  public Play(String game, int[] balls, int bonus)
  {
    this.game = game;
    ballArray = balls;
    Arrays.sort(ballArray);
    bonusBall = bonus;
  }

  /*
    public int getBall1()
    {
      return ballArray[0];
    }

    public int getBall2()
    {
      return ballArray[1];
    }

    public int getBall3()
    {
      return ballArray[2];
    }

    public int getBall4()
    {
      return ballArray[3];
    }

    public int getBall5()
    {
      return ballArray[4];
    }
  */
  public String getGame()
  {
    return game;
  }
  public int getBonusBall()
  {
    return bonusBall;
  }

  public int[] getBallArray()
  {
    return ballArray;
  }
}
