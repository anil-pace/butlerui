
/*
    Generated using:
    cat components/scripts/server_messages.json | sed 's/^.*: /_(/g' | sed 's/,$//g' | grep -Ev "({|})" | sed 's/$/);/g'
 */
function server_messages_list() {
    _("Scan item / Stage pps bin");
    _("Scan Tote to associate with Bin");
    _("Press PpsBin Button Or Scan a Tote");
    _("User Name");
    _("Password");
    _("Are you sure you want to close Tote");
    _("Details");
    _("Scan box barcode");
    _("Press PpsBin {0} to remove items");
    _("Tote is already scanned.Expecting pptl scan.");
    _("Totes are not required.Please don't scan tote barcode");
    _("Wrong PPS bin scanned");
    _("Please scan the tote first and then scan pptl barcode");
    _("Tote scanned.Expecting pptl scan.");
    _("Pptl scan not allowed. Totes are not required");
    _("Tote didn't get associated");
    _("After scannning tote barcode, please scan pptl barcode");
    _( "Wrong Ppsbin button pressed.Please press those buttons having color blue");
    _("Please complete process for pending ppsbin and then proceed");
    _("No totes associated. Pease keep totes in the Bin and then scan");
    _("Documents printed Successfully");
    _("No tote scanned");
    _("Tote cancelled");
    _("Tote already associated with ppsbin");
    _("Please press ppsbin button which does not have any totes associated");
    _("Tote assigned successfully to ppsbin {0}");
    _("Bin {0} items removed successfully");
    _("Totes are not required");
    _("Wrong Barcode scanned");
    _("Tote could not be reserved as already reserved");
    _("Exception invalid as totes are not required with this PPS");
    _("Override tote not possible");
    _("Scanning pptl barcode not allowed");
    _("Please press those buttons having color blink_blue");
    _("Unhandled event ocurred");
    _( "Barcode didn't match with current tote barcode");
    _("Testing configuration {0} and {1}");
    _("Processing. Please wait and scan later");
    _("Waiting for rack");
    _("Current PPS mode does not support back seat. Please logout.");
}
