const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;
 
let can = document.getElementById("can");//描画領域適宜
let con = can.getContext("2d");//どう描くかを制御


can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;


//キャラクター表示
let chImg = new Image(); //Imageというオブジェクトを作成
chImg.src = "sprite.png";//画像読み込み
//chImg.onload = draw;//読み込み終了後onloadの関数drawを実行

//更新処理
function update(){

}

//描画処理
function draw(){
    
con.fillStyle="#66AAFF";//プロパティcolor
con.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);//メソッド画面表示
con.drawImage(chImg, 0,0,16,32, 0,0,64,128);

con.font= "24px 'Impact'";
con.fillStyle="#FFFFFF";//プロパティcolor
con.fillText("FRAME : " +FrameCount, 10, 20);
//con.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
//img	表示する画像オブジェクト
//sx, sy	元画像の中の描画開始位置（スプライトの左上）
//sw, sh	元画像から切り出すサイズ（幅・高さ）
//dx, dy	キャンバス上に描画する位置
//dw, dh	キャンバス上に描画するサイズ
}
let FrameCount = 0;

//setInterval(mainLoop, 1000/60);//1秒間に60回mianLoopを呼び出す
//HTML読み込み終了後に実行＝ループ開始
window.onload = function(){
    mainLoop();
}

//メインループ
function mainLoop(){
    //
    FrameCount++;
    update();
    //
    draw();
    requestAnimationFrame(mainLoop);
}