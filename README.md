# isie-serve

使用 `nest` 编写的后端程序，师门下没人会 `Spring boot` ,我也懒得学了，拉 nest 过来用一下；

```ts
src
├── app.controller.spec.ts  // 针对控制器的单元测试
├── app.controller.ts       // 单个路由的基本控制器(Controller)
├── app.module.ts           // 应用程序的根模块(Module)
├── app.service.ts          // 具有单一方法的基本服务(Service)
├── main.ts                 // 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
```

## 主要文件目录

### app.module.ts

`AppModule`是应用程序的根模块，根模块提供了用来启动应用的引导机制，可以包含很多功能模块。

`.mudule`文件需要使用一个`@Module()` 装饰器的类，装饰器可以理解成一个封装好的函数，其实是一个语法糖

`@Module()` 装饰器接收四个属性：`providers、controllers、imports、exports`

- providers：Nest.js 注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享（注入器的概念后面依赖注入部分会讲解）；

- controllers：处理 http 请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给 providers 处理；

- imports：导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；

- exports：导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；

### app.controller.ts

使用`@Controller`装饰器来定义控制器, `@Get` 是请求方法的装饰器，对 getHello 方法进行修饰， 表示这个方法会被 GET 请求调用。

### app.service.ts

使用`@Injectable`修饰后的 `AppService`, 在 `AppModule` 中注册之后，在 `app.controller.ts` 中使用，我们就不需要使用 `new AppService()`去实例化，直接引入过来就可以用。

## 路由装饰器

`Nest.js` 中没有单独配置路由的地方，而是使用装饰器。`Nest.js`中定义了若干的装饰器用于处理路由。

如每一个要成为控制器的类，都需要借助 `@Controller` 装饰器的装饰，该装饰器可以传入一个路径参数，作为访问这个控制器的主路径

### HTTP 方法处理装饰器

- app.controller.ts

```ts
// 主路径为 app
@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 固定路径：
  // 可以匹配到 get请求，http://localhost:9080/app/list
  @Get("list")
  getHello(): string {...}

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post("list")
  create():string{...}

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get("user_*")
  getUser(){return "getUser"}

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put("list/:id")
  update(){ return "update"}
}
```

## 命令行参数

> nest g [文件类型] [文件名] [文件目录]

- 创建模块

> nest g mo users // 创建一个 users 模块，文件目录不写，默认创建和文件名一样的 users 目录

- 创建控制器

> nest g co users // 此时创建了一个 posts 控制器，命名为 users.controller.ts 以及一个该控制器的单元测试文件.

- 创建服务类

> nest g service users

注意创建顺序： 先创建 Module, 再创建 Controller 和 Service, 这样创建出来的文件在 Module 中自动注册，反之，后创建 Module, Controller 和 Service,会被注册到外层的 app.module.ts
