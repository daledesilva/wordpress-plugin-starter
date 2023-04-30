# falter-in-resolute_card-plugin

# Setting up a development environment

1. Install a wordpress locally using Local by Flywheel.
2. Clone the repo to any spot you want your source files to live.
3. Run `npm i` in the repo to install all dependencies.
4. If your files live in a dropbox sync'd folder, you should tell it to ignore the node_modules folder when syncing
    See: https://help.dropbox.com/sync/ignored-files
        `xattr -w com.dropbox.ignored 1 node_modules/`
        Note, you can view the attributes on it again with
        `xattr node_modules/`
        But also, if you exit the folder and go back into it, then right click the folder, you should now see an option for "Sync with dropbox" which wouldn't have been there before. This indicates it's not currently set to sync.
4. Run `ln -s <absolute path of dist folder> ../` in the repo. This will create a symbolic link to the dist folder in the parent directory.
5. Move the new symbolic link folder into the plugin folder of the wordpress install. Wordpress will now see the output of the plugin.
6. Run npm run dev to watch for code changes and rebuild into the dist folder on the fly. You will still need to refresh the frontend each time.

