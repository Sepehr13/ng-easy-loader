# Angular Easy Loader

This plugin helps you add a loader to your project VERY EASILY.
This loader mostly is used when you want to show a progress indicator to user when there is a http request in the background running.


## How to use it?

**Very Simple!** First import `EasyLoaderComponent` and wrap the most top-level html element (mostly located in **app.component.html**) with `<easy-loader-wrapper></easy-loader-wrapper>`. 
Then add this one little piece of code to your http request function in your service file.
**Keep in mind** it is recommended that the service function returns **Observable** or **Promise**

###Some useful input properties for `<easy-loader-wrapper>`
| Input    | Description | Usage |
| -------- | ------- |  ------- |
| indicatorAsset  | Use your custom gif as loading indicator    | indicatorAsset="assets/loading.gif"    |
| indicatorWidth | Width of the loading indicator     | [indicatorWidth]="150"     |
| indicatorHeight    | Height of the loading indicator    | [indicatorHeight]="150"    |

![simple use](https://github.com/user-attachments/assets/558bfa1f-4521-4c99-89b7-7e83c0ad4341)


### What if i want to show my own progress indicator in my own way?

All you have to do is to do the simple steps below:

 - Pass `false` to `@WithEasyLoader()`. Like this: `@WithEasyLoader(false)`. this will disable the default progress indicator for this function.
 - Define a variable in your component and use this decorator for it: `@BindTo()`.
 - Now pass the name of the service function to `@BindTo()`. Like this: `@BindTo("myHttpRequest")`
 - Finally you can either listen to it in you component .ts file or use it in your html template with `async` pipe.
 
 ![moderate use](https://github.com/user-attachments/assets/a0b6c8c9-8225-448e-a14a-383349e55943)


## I used two @BindTo annotations for same service function. why both variables changes?

The use-case for this scenario is when you have one single service function which is multi-purpose and only the input data changes. in this case you have to use `@ActionButton` annotation.

 - First add a second parameter to `@BindTo` annotation. this second parameter is string and can be anything your want for example: `@BindTo("myHttpRequest", "1")`.
 - Now add the `@ActionButton` with same exact inputs as `@BindTo` to the function which **triggers** the service function call.

![advanced use](https://github.com/user-attachments/assets/d2f4f35c-1bc4-43d1-8122-ab3387c3b6f6)


## Donation?

Thank you very much indeed!!!

- (Bitcoin) 3DBPAMsXSyHeo8aHQjjZzSAv2LX95XWv7n

- (USDT TRC20) TCKsLZZRWPUg7Kya69iPd5JnnnjqUzws8H

- (USDT BEP20) 0x264330c6f902248fc4034c5876e6fedb82b683ba

- (Ethereum ERC20) 0x62d64819fc937be4d9237e7b1e49dfbf715b40f5

- (TRX) TGgfmDeN5zUUqbQNPQdhVoDXSxuraeDwpZ
