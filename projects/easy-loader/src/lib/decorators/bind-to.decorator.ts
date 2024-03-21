import { map, retry, tap } from "rxjs";
import { EasyLoaderService } from "../easy-loader.service";
import { getPlatform } from "@angular/core";

export function BindTo(functionName: string, key?: string) {
    if (key && key.trim() == '') {
        throw new Error('@BindTo {key} paramenter cannot be empty string');
    }
    const functionNameSafe = functionName.replaceAll('$', '').replaceAll('!', '').replaceAll('?', '');
    
    return function(target: Object, propertyKey: string) {
        let shouldAddSlug: string;
        if(!key) {
            const pKey = propertyKey.includes('$') ? propertyKey : `${propertyKey}$`
            shouldAddSlug = `${pKey}_${functionNameSafe}`;
        }
        const getter = function() {
            const store = getPlatform()?.injector.get(EasyLoaderService);
            if(shouldAddSlug) store?.addSlug(shouldAddSlug);
            return store?.allEvents.pipe(
                // tap(console.log),
                map(events => {
                    if (events) {
                        if (events.some((p: string) => key
                            ? p.startsWith(`${functionNameSafe}_${key}`) && p.includes(':')
                            : p.startsWith(`${propertyKey}_${functionNameSafe}`) && p.includes(':')
                            )) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return false;
                })
            );
        }
        Object.defineProperty(target, propertyKey, {
          get: getter,
          set: (_) => {}
        }); 
    }
}