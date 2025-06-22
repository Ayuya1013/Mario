//class for mario 
const RIGHT = 1;
const LEFT = 0;
const GRAVITY = 4;
const MAX_SPEED_X = 32;

class Mario{
    constructor(x, y){
        this.x = x;//mario position x
        this.y = y;//mario position y
        this.vx  = 0;//mario speed x
        this.vy = 0;//mario speed y
        this.sprite = 0; // mario sprite num
        this.is_side = RIGHT; //side of mario
        this.is_jumping = false; //mario is jumping?
        this.Jcount = 0; // how long mario is jumping?
        this.stat = 0;//mario status
        this.pre_stat = 0; //pre mario status
        this.frame_count = 0;
    }
    //ジャンプするメソッド
    updateJump(){
        //ジャンピング
        if (keyb.Jump) {
            if(!this.is_jumping){
            this.is_jumping = true;
            this.Jcount += 1;
            }
            if(this.Jcount <= 16) {//何フレームまで上へ加速させるか
                this.vy = -(64 - this.Jcount);
            } 
            if(this.Jcount++>0);
        }
    }
    //歩くメソッド
    updateWalk(){
            //横移動
        if (keyb.Left === true && keyb.Right === false) { 
            //通常左歩行
            this.stat = 1;
            this.is_side = LEFT;
            //左急ブレーキ処理
            if(this.vx > 28 || (this.pre_stat == 2 && this.vx >0)) this.stat = 2;
            //速度更新左
            if (this.vx >= -32) this.vx -= 1; 
        } else if (keyb.Right === true && keyb.Left === false) {
            //通常右歩行
            this.stat = 1;
            this.is_side = RIGHT;
            //右急ブレーキ処理
            if (this.vx < -28 || (this.pre_stat == 2 && this.vx < 0)) this.stat = 2;
            //速度更新右
            if (this.vx <= 32) this.vx += 1;
        } else {
            if(!this.is_jumping){
            if (this.vx > 0) this.vx -= 1;
            if (this.vx < 0) this.vx += 1;
            if (!this.vx) this.stat = 0;
            }
        }
        //座標更新
        this.x += this.vx;
        this.y += this.vy;
    }
    //スプライト更新メソッド
    updateSprite(){
        if(this.is_jumping){
            if (this.is_side == RIGHT) this.sprite = 6;
            if (this.is_side == LEFT) this.sprite = 54;      
        }
        if(!this.is_jumping){
        if(!this.stat ) this.sprite = 0;//マリオが静止しているとき
        else if(this.stat == 1) {
            if (this.is_side == RIGHT) this.sprite = 16*16 + 2 + (this.frame_count >> 3) % 3;
            if (this.is_side == LEFT) this.sprite = 50 + (this.frame_count >> 3) % 3;   
                     
        } 
        else if(this.stat == 2) { 
            if (this.is_side == RIGHT) this.sprite = 5;
            if (this.is_side == LEFT) this.sprite = 53;
        }
}

    }
    update(){
        this.pre_stat = this.stat;
        this.frame_count++;
        if(this.vy <= 64) this.vy += GRAVITY;
        if(this.y > 150 <<4){
            this.vy = 0;
            this.is_jumping = false;
            this.y = 150<<4;
            this.Jcount = 0;
        }
        this.updateJump();
        this.updateWalk();
        this.updateSprite();
    }

    draw(){
        drawSprite(this.sprite, this.x, this.y);    
    }

}