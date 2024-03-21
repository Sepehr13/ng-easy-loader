import { getPlatform } from "@angular/core";
import { EasyLoaderService } from "../easy-loader.service";

export function ActionButton(functionName: string, key?: string) {
    return function (_: any, __: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]): any {
            const store = getPlatform()?.injector.get(EasyLoaderService);
            if (key) {
                store?.addSlug(`${functionName.replaceAll('$', '').replaceAll('!', '').replaceAll('?', '')}_${key.replaceAll('$', '').replaceAll('!', '').replaceAll('?', '')}`);
            }
            const result = originalMethod.apply(this, args);
            return result;
        };
    };
}