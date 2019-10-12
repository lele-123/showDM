
//1、类（属性和方法）：轮播图
class Banner01{
    //构造函数
    constructor(boxDom,obj){
        this.boxDom = boxDom;
        this.boxImg = null;//所有图片标签的容器
        this.ul = null;//所有li标签的容器
        let defaultObj = {
            imgs:["img/1.jpg","img/2.jpg"],
            width:400,
            height:300,
            timeSpace:1500,
            index:0,
            douSize : 16,
            douIsCircle:true,
            douColor:"pink",
            douHighColor:"red"
        };
        for(let key  in defaultObj){//key = imgs;
            if(obj[key]!=undefined){ //obj["imgs"]
                this[key] = obj[key];
            }else{
                this[key] = defaultObj[key]; 
            }
        }

        this.myTimer = null;
        this.render();
        this.autoPlay();
        this.addEvent();
    }

    //方法：
    //渲染（创建所有的dom元素）
    render(){
        //1、创建图片及其容器
        //1)、容器
        this.boxImg = document.createElement("div");
        this.boxImg.style.cssText = ` 
            position: absolute;
            width: 100%;
            height: 100%;`;
        this.boxDom.appendChild(this.boxImg);
        //2)、图片
        let num = this.imgs.length;
        for(let i=0;i<num;i++){
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            `;
            if(i==0){
                imgDom.style.opacity = 1;
            }
            this.boxImg.appendChild(imgDom);
        }
        //2、创建豆豆及其容器
        //1)、容器
        this.ul = document.createElement("ul");
        this.ul.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: ${this.width+140}px;
            list-style: none;
            z-index: 1;
        `;
        this.boxDom.appendChild(this.ul);
        //2)、li
        for(let i=0;i<num;i++){
            let li = document.createElement("li");
            li.style.cssText = `
                float: left;
                margin-left:10px;
                width:${this.douSize}px;
                height: ${this.douSize}px;
                background-color: ${this.douColor};
            `;
            if(this.douIsCircle){
                li.style.borderRadius = "50%";
            }
            if(i==0){
                li.style.backgroundColor = this.douHighColor;
            }
            this.ul.appendChild(li);
        }
    }

    //自动播放
    //1、自动播放（每隔一定时间换一张图片）
    autoPlay(){
        this.myTimer = setInterval(() => {
            //一、处理数据
            //1、
            let outIndex = this.index;
            this.index++;//1
            //2、
            if(this.index>this.imgs.length-1){
                this.index=0;
            }
            //二、改变外观
            let imgDoms = this.boxImg.children;
            fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
            let liDoms = this.ul.children;
            liDoms[this.index].style.backgroundColor = this.douHighColor;
            liDoms[outIndex].style.backgroundColor = this.douColor;
        }, this.timeSpace);
    }

    //2、停止播放
    stop(){
        window.clearInterval(this.myTimer);
    }

    //4、跳转到指定图片
    goImg(transOrd){
        //一、处理数据    
        let outIndex = this.index;
        this.index = transOrd;

        if(this.index>this.imgs.length-1){
            this.index=0;
        }

        //二、改变外观
        let imgDoms = this.boxImg.children;
        fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
        let liDoms = this.ul.children;
        liDoms[this.index].style.backgroundColor = this.douHighColor;
        liDoms[outIndex].style.backgroundColor = this.douColor;
    }

    addEvent(){
        //2、鼠标移入，停止播放
        this.boxDom.onmouseover = ()=>{
            this.stop();
        }
    
        //3、鼠标离开继续播放 
        this.boxDom.onmouseout = ()=>{
            this.autoPlay();
        }
        
        //4、点击豆豆跳转到对应的图片上。
        let liDoms = this.ul.children;
        for(let i=0;i<liDoms.length;i++){
            liDoms[i].onclick = ()=>{
                this.goImg(i);
            }
        }
    }
}