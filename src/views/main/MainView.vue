<template>
    <div class="mainView">
        <div class="mainLeft">
            <el-card>
                <!--      轮播图          -->
                <div class="cardCarousel">
                    <el-carousel class="carousel" :interval="5000" arrow="always">
                        <!--v-for item为遍历的每一个item-->
                        <el-carousel-item class="carouselItem" v-for="(item,index) in carouselList" :key="index">
                            <el-image v-bind:src="item"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>

                <!--帖子列表区域-->
                <div v-for="(item,index) in postBarList" :key="index">
                    <h4>{{ item.kindName }}</h4>
                    <el-button class="postTitle" type="text">【{{ item.typeName }}】{{ item.name }}</el-button>
                    <div class="postContent">
                        {{ item.content }}
                    </div>
                    <div class="contentImage">
                        <img src="https://nimg.ws.126.net/?url=http%3A%2F%2Fvideoimg.ws.126.net%2Fcover%2F20230125%2FXolnQ6j9U_cover.jpg&thumbnail=750x2147483647&quality=75&type=jpg">
                        <img src="https://nimg.ws.126.net/?url=http%3A%2F%2Fvideoimg.ws.126.net%2Fcover%2F20230125%2FXolnQ6j9U_cover.jpg&thumbnail=750x2147483647&quality=75&type=jpg">
                        <img src="https://nimg.ws.126.net/?url=http%3A%2F%2Fvideoimg.ws.126.net%2Fcover%2F20230125%2FXolnQ6j9U_cover.jpg&thumbnail=750x2147483647&quality=75&type=jpg">
                    </div>
                    <div class="userInfoOut">
                        <div class="nickNameOut">
                            <!--div的class引用element元素                           -->
                            <div class="el-icon-user-solid"></div>
                            <div class="nickNameClass">油田小迷弟</div>
                        </div>
                        <div>2023-02-09 11:12:54</div>
                    </div>
                    <el-divider content-position="left"></el-divider>
                </div>
            </el-card>
        </div>
        <div class="mainRight">
            <!--    公告        -->
            <el-card>
                <div class="noticeContent" v-for="(item,index) in notice" :key="index">
                    {{ item }}
                </div>
            </el-card>
            <el-card>
                <!--热门吧    slot插槽头部标题-->
                <div slot="header">
                    <div class="noticeTitle">热门吧</div>
                </div>
                <div class="postBarOutParent">
                    <div class="postBarOut" v-for="(item,index) in 6" :key="index">
                        <div>
                            <!--                        <el-image class="postBarImage" src="https://img1.baidu.com/it/u=327117927,1656669816&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=388"></el-image>-->
                            <img class="postBarImage" src="../../assets/img.png">
                        </div>
                        <div class="postBarInfo">
                            <div>狂飙吧</div>
                            <div class="postBarUserInfo">
                                <div class="el-icon-edit-outline"></div>
                                <div>12000</div>
                            </div>
                        </div>
                    </div>
                </div>

            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        /*定义初始化变量*/
        data() {
            return {
                carouselList: [
                    'https://img1.baidu.com/it/u=2566564959,2152412607&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500',
                    'https://img0.baidu.com/it/u=870598672,43424393&fm=253&fmt=auto&app=138&f=GIF?w=500&h=310',
                    'https://img0.baidu.com/it/u=3964395355,452146897&fm=253&fmt=auto&app=138&f=JPEG?w=844&h=500'
                ],
                notice: [
                    '1、与贴吧无关，水帖子水帖子水帖子水帖子水帖子水帖子水帖子水帖子',
                    '2、与贴吧无关，水帖子',
                    '3、与贴吧无关，水帖子',
                    '4、与贴吧无关，水帖子',
                    '5、与贴吧无关，水帖子'
                ],
                postBarList: []
            }
        },
        /*事件绑定的函数*/
        methods: {
            selectAllPostBar() {
                //get('请求的具体地址')表示查询， then(res=>{})表示回调函数
                this.$axios.get('postBar/selectAllPostBar', {
                    params: {
                        /*查第几页*/
                        pageNum: 1,
                        /*查多少条*/
                        pageSize: 2
                    }
                }).then(res => {
                    /*后台响应的数据--->result*/
                    this.postBarList = res.data.data.rows
                })
            }
        },
        /*生命周期：页面加载完毕就执行的方法*/
        created() {
            this.selectAllPostBar()
        }
    }
</script>

<style scoped>
    @import url("./MainView");
</style>