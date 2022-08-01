// import sound from './src/sound-play.js';
import { fileList } from './src/dirFileList.js';
import fs from 'fs';

const musicList = await fileList('//192.168.0.188/share/music');

const len = musicList.length;
console.log(`共找到歌曲 ${len} 首`);

const content = `\uFEFF
  $global:musicList = ${musicList.join(',')};

  Add-Type -AssemblyName presentationCore;
  $global:player = New-Object system.windows.media.mediaplayer;
  $global:time = 0;
  $global:pauseLock = "false";

  function global:sleepFn() {
    if($player.NaturalDuration.TimeSpan) {
      $time = 0;

      Write-Host "歌曲时长: " $player.NaturalDuration.TimeSpan.TotalSeconds"s";

      Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;

    } else {
      if($time -gt 233) {
        Write-Host "加载失败,随机播放下一首";

        $time = 0;

      } else {
        $time = $time + 1;
        Start-Sleep 1;

        Write-Host "等待加载中... " $time"s";

        sleepFn;

      }
    }
  }

  function global:play() {

    if($global:pauseLock -eq "true") {
      $player.play();

      $global:pauseLock = "false";
    } else {
      $index = get-random -maximum $musicList.length;

      Write-Host "歌曲名: " $musicList[$index];
      Write-Host "随机数: " $index;

      $player.open($musicList[$index]);
      $player.play();
    }

    sleepFn;

    play;
  };

  function global:stop() {
    $player.stop();
  }

  function global:pause() {
    $player.pause();
    $global:pauseLock = "true";
  }

  play;
`;

fs.writeFileSync('./random-player.ps1', content);

// const play = async () => {
//   const romdaom = ~~(Math.random() * len);
//   let music = musicList[romdaom];
//   try {
//     console.log(music, romdaom)
//     await sound.play(music.path, 1);
//     play();
//   } catch (err) {
//     console.log(err);
//     play();
//   }
// }

// await play();
