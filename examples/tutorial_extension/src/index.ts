import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { jupyterIcon } from '@jupyterlab/ui-components';

import { TutorialWidget } from './widget';

/**
 * Initialization data for the tutorial-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'tutorial-extension:plugin',
  autoStart: true,
  optional: [ISettingRegistry, ILauncher],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null, launcher: ILauncher | null) => {
    console.log('JupyterLab extension tutorial-extension is activated!');

    // Load the settings from schema/plugin.json
    // This can include adding commands to a context menu
    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('tutorial-extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for tutorial-extension.', reason);
        });
    }

    app.commands.addCommand('tutorial:open', {
      // code to run when this command is executed
      execute: () => {
        const widget = new TutorialWidget();
        const main = new MainAreaWidget({ content: widget });
        main.title.label = 'Tutorial Widget';
        main.title.icon = jupyterIcon;
        main.title.caption = widget.title.label;

        app.shell.add(main, 'main');
      },
      icon: jupyterIcon,
      label: 'Open Tutorial Widget'
    });

    //
    if (launcher) {
      launcher.add({
        command: 'tutorial:open'
      });
    }
  }
};

export default plugin;
