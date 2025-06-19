const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;
const GAME_FPS = 1000 / 60;
const RIGHT = 1;
const LEFT = 0;
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

//マリオの変数
let mario_x = 100<<4;//x座標途中の演算を整数で行い誤差をなくすためのシフト．描画で実座標に戻す
let mario_y = 100<<4;//y座標
let mario_vx = 0;//マリオのx軸方向の加速度
let mario_sprite = 1;
let is_mario_side = 0;
let mario_stat;
let keyb = {
  Left: false,
  Right: false
};

//更新処理
function update() {
    let pre_mario_stat = mario_stat;
    //マリオの動きに合わせて各変数を更新する
  if (keyb.Left === true && keyb.Right === false) {
    //通常左歩行
    mario_stat = 1;
    is_mario_side = LEFT;
    //左急ブレーキ処理
    if(mario_vx > 28 || (pre_mario_stat == 2 && mario_vx >0)) mario_stat = 2;
    //速度更新左
    if (mario_vx >= -32) mario_vx -= 1;
  } else if (keyb.Right === true && keyb.Left === false) {
    //通常右歩行
    mario_stat = 1;
    is_mario_side = RIGHT;
    //右急ブレーキ処理
    if (mario_vx < -28 || (pre_mario_stat == 2 && mario_vx < 0)) mario_stat = 2;
    //速度更新右
    if (mario_vx <= 32) mario_vx += 1;
  } else {
    if (mario_vx > 0) mario_vx -= 1;
    if (mario_vx < 0) mario_vx += 1;
    if (!mario_vx) mario_stat = 0;
  }
  mario_x += mario_vx;

  //アニメーション変数によりマリオのスプライト変数を更新する
  if(!mario_stat) mario_sprite = 0;//マリオが静止しているとき
  else if(mario_stat == 1) {
    if (is_mario_side == RIGHT) mario_sprite = 2 + (FrameCount >> 3) % 3;
    if (is_mario_side == LEFT) mario_sprite = 50 + (FrameCount >> 3) % 3;      
  }
  else if(mario_stat == 2) { 
    if (is_mario_side == RIGHT) mario_sprite = 5;
    if (is_mario_side == LEFT) mario_sprite = 53;
  }
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
drawSprite(mario_sprite, mario_x, mario_y);

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
    if (e.code === "ArrowLeft"||e.code === "KeyA")  keyb.Left  = true;
    if (e.code === "ArrowRight"||e.code === "KeyD") keyb.Right = true;
});

// キーボードが離されたとき
document.addEventListener("keyup", function(e) {
     if (e.code === "ArrowLeft"||e.code === "KeyA") keyb.Left  = false;
    if (e.code === "ArrowRight"||e.code === "KeyD") keyb.Right = false;
});
