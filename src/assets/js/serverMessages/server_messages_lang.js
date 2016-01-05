
/*
    Generated using:
    cat components/scripts/server_messages.json | sed 's/^.*: /_(/g' | sed 's/,$//g' | grep -Ev "({|})" | sed 's/$/);/g'
 */
function server_messages_list() {
    _("No ppsbins empty. Please empty them");
    _("Scanned item details not found");
    _("Waiting for rack. Please wait and scan later");
}
