const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;
const GAME_FPS = 1000 / 60;

//仮想キャンバス宣言
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

//実態キャンバス宣言
let can = document.getElementById("can");//描画領域適宜
let con = can.getContext("2d");//どう描くかを制御

//仮想キャンバスサイズ宣言
vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

//実態キャンバスサイズ宣言
can.width = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

//描画のぼやぼやをなくすメソッド
con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//キャラクター表示
let chImg = new Image(); //Imageというオブジェクトを作成
chImg.src = "sprite.png";//画像読み込み
//chImg.onload = draw;//読み込み終了後onloadの関数drawを実行

//フレームレート制御
let FrameCount = 0;
let startTime;

//各クラス定義
let Mario1 = new Mario(100<<4, 100<<4);//マリオに関する演算を整数で行うためシフトして演算．描画の時に少数に戻す.

//キーボード入力情報格納用
let keyb = {
  Left: false,
  Right: false,
  Jump: false
};

//更新処理
function update() {    
 Mario1.update();
}

//アニメーション（スプライト番号依存の出力処理）
function drawSprite(snum, x, y){
    let sx = (snum&15) *16;
    let sy = (snum>>4) *16;
    vcon.drawImage(chImg, sx,sy,16,32, x>>4,y>>4,16,32);//マリオ表示仮想
}

//描画処理
function draw(){
vcon.fillStyle="#66AAFF";//プロパティcolor水色
vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);//メソッド画面表示
Mario1.draw();
//デバッグ情報表示
vcon.font= "24px 'Impact'";
vcon.fillStyle="#FFFFFF";//プロパティcolor
vcon.fillText("FRAME : " +FrameCount, 10, 20);//readme参照
//仮想描画を実体にプロット
con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W*3, SCREEN_SIZE_H*3);
}

//setInterval(mainLoop, 1000/60);//1秒間に60回mianLoopを呼び出す
//HTML読み込み終了後に実行＝ループ開始
window.onload = function(){    
    startTime = performance.now();
    update();
    mainLoop();
} 

//メインループ
function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime) / GAME_FPS;//今のプログラム時間，60fpsで動いた時のフレーム数
    
    if(nowFrame > FrameCount){//更新可能な時＝60fpsを超えないとき
    let c = 0;
    while(nowFrame > FrameCount){//いまのフレーム数とフレーム制御の間に大差があるとき4倍で時間を進めて差を小さくする
    FrameCount++;
    update();
    if(++c >= 4)break;
    }
    //
    draw();
    }
    requestAnimationFrame(mainLoop);
}

// キーボードが押されたとき
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") keyb.Jump = true;
    if (e.code === "ArrowLeft"||e.code === "KeyA")  keyb.Left  = true;
    if (e.code === "ArrowRight"||e.code === "KeyD") keyb.Right = true;
});

// キーボードが離されたとき
document.addEventListener("keyup", function(e) {
    if (e.code === "Space") keyb.Jump = false;
    if (e.code === "ArrowLeft"||e.code === "KeyA") keyb.Left  = false;
    if (e.code === "ArrowRight"||e.code === "KeyD") keyb.Right = false;
  });
