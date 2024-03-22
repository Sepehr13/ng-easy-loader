# Angular Easy Loader

This plugin helps you add a loader to your project VERY EASILY.
This loader mostly is used when you want to show a progress indicator to user when there is a http request in the background running.


## How to use it?

**Very Simple!** First import `EasyLoaderComponent` and wrap the most top-level html element (mostly located in **app.component.html**) with `<easy-loader-wrapper></easy-loader-wrapper>`. 
Then add this one little piece of code to your http request function in your service file.
**Keep in mind** it is recommended that the service function returns **Observable** or **Promise**

![simple use](https://github.com/Sepehr13/ng-easy-loader/assets/21054209/482cbf08-fb15-4bb0-a507-3aa2045e987c)

### What if i want to show my own progress indicator in my own way?

All you have to do is to do the simple steps below:

 - Pass `false` to `@WithEasyLoader()`. Like this: `@WithEasyLoader(false)`. this will disable the default progress indicator for this function.
 - Define a variable in your component and use this decorator for it: `@BindTo()`.
 - Now pass the name of the service function to `@BindTo()`. Like this: `@BindTo("myHttpRequest")`
 - Finally you can either listen to it in you component .ts file or use it in your html template with `async` pipe.
 
 ![moderate use](https://github.com/Sepehr13/ng-easy-loader/assets/21054209/cd0e5874-9888-452c-8e27-5cfb2d9ab271)

## I used two @BindTo annotations for same service function. why both variables changes?

The use-case for this scenario is when you have one single service function which is multi-purpose and only the input data changes. in this case you have to use `@ActionButton` annotation.

 - First add a second parameter to `@BindTo` annotation. this second parameter is string and can be anything your want for example: `@BindTo("myHttpRequest", "1")`.
 - Now add the `@ActionButton` with same exact inputs as `@BindTo` to the function which **triggers** the service function call.

![enter image description here](https://github.com/Sepehr13/ng-easy-loader/assets/21054209/92b8a97a-3eac-4e1f-9b61-e6a677dc0f60)

## Donation?

Thank you very much indeed!!!

- (Bitcoin) bc1q0hzfgfhw6cpam90kj0s45h0jj222w7mrsexem7

- (USDT Tron Network) TRoSbkdspucUR9PTK2Wdieq9ZMvkohb7fm

- (Ethereum ETH Network) 0xa7Ecf7D686C3B9521a4cC272effDf30B45779bf8

- (TRX) TRoSbkdspucUR9PTK2Wdieq9ZMvkohb7fm
