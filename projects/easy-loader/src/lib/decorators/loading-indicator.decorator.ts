import { RetryConfig, finalize, isObservable, map, retry, take } from "rxjs";
import { EasyLoaderService } from "../easy-loader.service";
import { getPlatform } from "@angular/core";

export function WithEasyLoader(showLoadingIndicator: boolean = true) {
    return function (_: any, functionName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const functionNameSafe = functionName.replaceAll('$', '').replaceAll('!', '').replaceAll('?', '');
        descriptor.value = function (...args: any[]): any {
            const store = getPlatform()?.injector.get(EasyLoaderService);
            let slug = "";
            let multi = false;
            let rewriteState: string[] = [];
            store?.allEvents.pipe(
                map(m => {
                    if (m && m.length > 0) {
                        return m;
                    } else {
                        throw new Error("[Easy Loader]: events are empty!")
                    }
                }),
                retry({ delay: 1 } as RetryConfig),
                take(1)
            ).subscribe(events => {
                if (events && events.length > 0) {
                    rewriteState = [];
                    rewriteState = events.filter(p => p.includes(functionNameSafe) && !p.includes(':'));
                    if (rewriteState.length > 0) {
                        rewriteState = rewriteState.map(m => {
                            let slug = `${m}:${generateUUID()}`;
                            if (showLoadingIndicator) slug += '*';
                            return slug
                        });
                        store?.deletePendingSlugs(functionNameSafe);
                        store?.addGroupSlugs(rewriteState);
                        multi = true;
                    } else {
                        slug = `${functionNameSafe}:${generateUUID()}`;
                        if (showLoadingIndicator) slug += '*';
                        store?.addSlug(slug);
                    }
                } else {
                    slug = `${functionNameSafe}:${generateUUID()}`;
                    if (showLoadingIndicator) slug += '*';
                    store?.addSlug(slug);
                }
            });

            const result = originalMethod.apply(this, args);

            if (isObservable(result)) {
                return result.pipe(
                    finalize(() => {
                        if (multi) {
                            store?.deleteFinishedSlugs(rewriteState);
                        } else {
                            store?.deleteSlug(slug);
                        }
                    })
                );
            } else if (result instanceof Promise) {
                return result.finally(() => {
                    if (multi) {
                        store?.deleteFinishedSlugs(rewriteState);
                    } else {
                        store?.deleteSlug(slug);
                    }
                });
            } else {
                if (multi) {
                    store?.deleteFinishedSlugs(rewriteState);
                } else {
                    store?.deleteSlug(slug);
                }
                return result;
            }

        };
    };
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}