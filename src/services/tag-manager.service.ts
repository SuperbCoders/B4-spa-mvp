import TagManager, { TagManagerArgs } from 'react-gtm-module';

export class TagManagerService {
  private static tagManagerArgs: TagManagerArgs = {
    gtmId: 'GTM-W2CB8BQ'
  };

  public static initialize(): void {
    TagManager.initialize(this.tagManagerArgs);
  }

  public static pushEvent(eventName: string): void {
    TagManager.dataLayer({ dataLayer: { dataLayer: eventName } });
  }
}
