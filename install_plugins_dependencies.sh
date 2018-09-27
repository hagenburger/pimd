for plugin in plugins/* ; do
    if [[ -d $plugin ]]; then
        sh -c "cd $plugin && npm install"
    fi
done
