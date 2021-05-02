// 整个包的入口
// 统一导出
import MusicPlay from './musicplay';
import './fonts/iconfont.css'
const components = [
    MusicPlay
]
//定义install方法，接收Vue作为参数，如果使用use注册组件，那么所有的组件都会被注册
const install = function(Vue){
    //判断是否安装
    if(install.installed) return;
    //遍历注册全局组件
    components.map(component=>Vue.component(component.name,component));
}
//判断是否直接引入组件
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}
export default{
    //导出的对象必须具有install，才能被Vue.use()方法安装
    install,
}