package com.rkd.lotteryrest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin ()
@RestController
public class PlayController
{
  private final PlayGenerator powerBallGen = new PlayGenerator("Powerball", 69, 26);
  private final PlayGenerator megaGen = new PlayGenerator("MegaMillions", 70, 25);
  @GetMapping("/powerball")
  public Play[] getPowerPlays(@RequestParam(value = "numplays", defaultValue = "1") int numPlays)
  {
    return powerBallGen.getPlays(numPlays);
  }

  @GetMapping("/megamillions")
  public Play[] getMegaPlays(@RequestParam(value = "numplays", defaultValue = "1") int numPlays)
  {
    return megaGen.getPlays(numPlays);
  }
}
