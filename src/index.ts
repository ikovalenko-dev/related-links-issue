import { IWorkItemFormService, IWorkItemNotificationListener, WorkItemTrackingServiceIds } from 'azure-devops-extension-api/WorkItemTracking';
import * as SDK from 'azure-devops-extension-sdk';



/**
 * Initializes ADO extension view
 * @param registerEvents - work item event listener factory
 */
export async function main(): Promise<void> {
    await SDK.init();

    const registerEvents = () => {
        const listener: IWorkItemNotificationListener = {
            onFieldChanged: args => {
                const { changedFields } = args;
                if (changedFields['System.RelatedLinks'] === undefined) {
                    return;
                }
                SDK
                    .getService<IWorkItemFormService>(WorkItemTrackingServiceIds.WorkItemFormService)
                    .then(service => service.getWorkItemRelations())
                    .then(relations => console.log(`current: ${changedFields['System.RelatedLinkCount']}`, `request result: ${relations.length}`))
                    .catch(error => console.error(error))
            },
            onLoaded: args => console.log(args),
            onRefreshed: args => console.log(args),
            onReset: args => console.log(args),
            onSaved: args => console.log(args),
            onUnloaded: args => console.log(args)
        }
        return listener
    };

    SDK.register(SDK.getContributionId(), registerEvents);

    await SDK.notifyLoadSucceeded();
}

main().catch(error => console.error(error))