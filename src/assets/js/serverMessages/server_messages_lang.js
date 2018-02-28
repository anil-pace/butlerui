
/*
    Generated using:
    cat components/scripts/server_messages.json | sed 's/^.*: /_(/g' | sed 's/,$//g' | grep Ev "({|})" | sed 's/$/);/g'
 */
function server_messages_list() {
    _("Scan item / Stage PPS Bin");
    _("Scan Tote to associate with Bin");
    _("Press PpsBin Button Or Scan a Tote");
    _("User Name");
    _("Password");
    _("Are you sure you want to close Tote");
    _("Details");
    _("Scan {0} items");
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
    _("Wrong Ppsbin button pressed.Please press those buttons having color blue");
    _("Please complete pickback for pending bin and then proceed");
    _("No totes associated. Pease keep totes in the Bin and then scan");
    _("Documents printed Successfully");
    _("No tote scanned");
    _("Tote cancelled");
    _("Tote already associated with ppsbin");
    _("Incorrect tote barcode scanned. Please try again");
    _("Please press PPTL button which does not have any totes associated");
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
    _("Barcode didn't match with current tote barcode");
    _("Testing configuration {0} and {1}");
    _("Processing. Please wait and scan later");
    _("Waiting for rack");
    _("Current PPS mode does not support back seat. Please logout.");
    _("Scan items and place in bin {0}");
    _("Stage Bin or Scan Entity");
    _("Place Entity in Bin and Press PPTL");
    _("Are You Sure You Want to Close Tote?");
    _("Scan Tote or Stage PPS Bin");
    _("Item Not Expected in Tote");    
    _("Tote already opened. Scan some other tote");
    _("Tote already closed. Scan some other tote");
    _("No matching tote found");
    _("Wrong entity scanned. Please scan tote");
    _("No entities added yet. Scan entities and then press PPTL");
    _("Wrong entity scanned. Please scan Container/Item.");
    _("Cannot cancel scan. No scanned box found");
    _("Entity scan not expected. Waiting for PPTL press");
    _("Bin selected for put. Cannot be staged");
    _("SKU not present in database. Put into IRT bin.");
    _("No free bins. Please scan later");
    _("Wrong PPTL pressed. Please try another");    
    _("Please put entities in exception area and confirm");
    _("Wrong bin chosen.Try selecting another bin");
    _("Please scan same SKU to complete this exception");
    _("Entity scan not expected.");
    _("Tote not present in database.");
    _("Tote has been opened.Scan all items in tote and then scan tote again to close it");
    _("PPS is in paused mode. Cannot process new entity. Try after some time");
    _("Cancel scan successful.");
    _("Tote close successful.");
    _("Tote not closed.");
    _("Entity scan successful.");
    _("PPTL press successful");
    _("Data capture valid");
    _("Excess item in tote recorded. Now press PPTL");
    _("Excess item in tote recorded.");
    _("{0} unscannable entities recorded. WMS notified");
    _("{0} extra entities recorded in bin. WMS notified");
    _("{0} oversized entities recorded.WMS notified");
    _("{0} Physically damaged entity recorded.WMS notified");
    _("Exception cancelled");
    _("Box with same serial number already exists in the warehouse");
    _("Entity already scanned.Waiting for PPTL press");
    _("No bins available to stage");
    _("Bin already staged. Ignoring event");
    _("Bin empty. Cannot be staged");
    _("Scan Box/Items from Slot");
    _("Scan Remaining Item In Box");
    _("Last Box Scan Completed! Scan Remaining Box/Items");
    _("Status To Reconcile");
    _("This box belongs to some other SKU in the slot.Put it back.Scan next box.");
    _("This box does not belong to this slot. Remove the box and put in exception area.");
    _("Waiting for MSU");
    _("Wrong Barcode");
    _("Box Scan successful");
    _('Item Scan successful');
    _("Item scan successful");
    _('Data capture failed at item {0}');
    _('Bin {0} selected');
    _('Bin {0} unselected');
    _('Connection is closed. Connecting...');
    _('Extra item found please put back item in Exception bin');
    _("Enter Unscannable Entity Quantity");
    _("Scan Oversized Entity Quantity");
    _("Please Select The Bin With Excess Entity");
    _("Enter Quantity of Excess Entities");
    _("Please put entities in exception area and confirm");
    _("Place Entity in Slot and Scan More");
    _("Scan Slot to Confirm");
    _("Wait for MSU");
    _("Scan Entity From Bin {0}");
    _("Enter Good Quantity to be Put into Slot");
    _("Put Back Entities in the PPS Bin");
    _("Wait for MSU");
    _("Confirm MSU Release");
    _("Scan Slot");
    _("Scan {0} Items");
    _("Cancel audit successful.Audit Restarted");
    _("Scan Box");
    _("Scan {0} Items and Place in Bin {0}");
    _("Press PPTL to confirm");
    _("Scan Tote to Associate with Bin");
    _("Press PPTL or Scan a Tote");
    _("Press bin PPTL to remove entities");
    _("Press bin PPTL");
    _("Press PPTL for bin {0} to confirm");
    _("Press print button to proceed");
    _("Select Bin to skip print");
    _("Select Bin which does not require tote");
    _("Select Bin to disassociate tote");
    _("Pick complete. Waiting for next rack.");
    _("Location scan successful");
    _("Box scan successful");
    _("Item scan successful");
    _("Cancel scan successful");
    _("PPTL press successful");
    _("Expecting MSU release confirmation from GUI, got invalid event.");
    _("Data capture failed at item");
    _("Wrong slot location scanned. Please try again");
    _("Wrong box scanned. Please try again");
    _("Scan a box first");
    _("Wrong PPTL pressed. Please press correct PPTL");
    _("Picked quantity more than expected. Put extra items back in MSU");
    _("Wrong item quantity update");
    _("Wrong item scanned. Please scan correct item");
    _("Waiting for MSU. Please wait and scan later");
    _("System Error. Scanned entity details not available at this time");
    _("No PPS bins empty. Please empty them from Pickback");
    _("PPS mode change requested:scan not allowed");
    _("PPS mode change requested:auto staging all bins");
    _("PPTL press not expected");
    _("Scan not expected");
    _("Barcode didn't match the current tote barcode");
    _("System not configured for totes");
    _("Invalid Exception for this configuration");
    _("No tote associated. Please keep a tote in bin and scan");
    _("Wrong PPTL pressed");
    _("Tote didn't get associated");
    _("Totes are anyway not required.Please proceed further");
    _("Exception cancelled");
    _("Tote scan cancelled");
    _("Documents printed successfully");
    _("Order removed successfully from bin {0}");
    _("Tote assigned successfully to bin");
    _("Tote association failed. Repeat scan operation");
    _("Tote associated with another bin");
    _("Please scan PPTL barcode");
    _("Tote disassociated from Bin");    
    _("Please complete process for pending bin and then proceed");
    _("Tote already reserved");
    _("Wrong barcode scanned");
    _("Please scan the tote first and then scan PPTL barcode");
    _("No tote scanned");
    _("Override Tote Exception cannot be raised for bins with totes associated");
    _("PPTL scan not allowed. System not configured for tote");
    _("PPTL scan not allowed");
    _("Tote scan expected");
    _("Entity scanned is not from bin {0}. Replace and scan from bin {1}");
    _("Wrong entity scanned");
    _("Waiting for MSU scan. Please scan entity later.");
    _("Expected quantity exceeded.");
    _("Wrong scan! Entity scan expected but slot barcode scanned.");
    _("Actual put quantity not equal to the sum of Good and Expection quantity.");
    _("Actual put quantity less than than revised quantity.");
    _("Wrong slot scanned");
    _("Entity scan successful");
    _("Slot scan successful");
    _("Slot scan successful");
    _("Damaged and missing entity recorded.");
    _("Space unavailable recorded.");
    _("Cancel scan successful");
    _("Please put entity in exception area and confirm");
    _("Entity not expected in tote. Please put entity in exception area and confirm");
    _("{0} excess entities found in tote. Please put entities in exception area and confirm");
    _("Cancelled excess entity in tote");
    _("Cancelled invalid entity in tote");
    _("Invalid entity in tote recorded");
    _("Wrong enitity scanned. Expecting scan from bin {0}");
    _("PPTL Management");
    _("Scanner Management");
    _("Entity Oversized");
    _("Entity Unscannable");
    _("Extra Entities in Bin");
    _("Entity Missing / Unscannable");
    _("Space Not Available");
    _("Entity Missing / Unscannable");
    _("Mising Box");
    _("Disassociate Tote");
    _("Overide Tote Required");
    _("Reprint");
    _("Skip Print");
    _("Peripheral added successfully");
    _("Peripheral not added");
    _("Scan Box or Items");
    _("Check Count");
    _("You cannot enter value more than 9999");
    _("Please enter a quantity greater than 0");
    _("Place extra entity in Exception area.");
    _("Sum of missing, good and damaged should be equal to {0}");
    _("Scan excess item quantity");
    _("Quantity should be less than or equal to {0}");
    _("You are not allowed to keyed in the quantity from the numpad. Force Scan is required.");
    _("Waiting for Bins to be Cleared at Pick Back");
    _("Peripheral deleted successfully");
    _("Peripheral not deleted successfully");
    _("Cancel Exception");
    _("Cancel Scan");
    _("Finish");
    _("Back");
    _("OK");
    _("FINISH");
    _("Print");
    _("Skip Printing");
    _("Disassociate Tote");
    _("Override");
    _("Add Scanner");
    _("Edit Details");
    _("NEXT");
    _("CONFIRM");
    _("Stage");
    _("Stage All");
    _("BACK");
    _("CLOSE");
    _("Cancel");
    _("Confirm");
    _("TOTE");
    _("Clear All");
    _("Submit");
    _("Exceptions");
    _("Next");
    _("Bin");
    _("Selected");
    _("Unselected");
    _("System is Idle");
    _("CURRENT SLOT");
    _("Box Serial Numbers");
    _("No Items To Reconcile");
    _("List Of Items To Reconcile");
    _("User Name");
    _("Password");
    _("View More");
    _("Please put exception entities in exception area");
    _("Please put exception entities in IRT bin and scan the bin");
    _("Product Information");
    _("Bin Info");
    _("Associate tote with bin");
    _("Extra Entity Found");
    _("Perform Action");
    _("Input Extra Details");
    _("Add Scanner");
    _("Box Serial Numbers");
    _("Expected");
    _("Actual");
    _("Finish");
    _("Bin ID");
    _("Barcode");
    _("Peripheral ID");
    _("Actions");
    _("Scanner ID");
    _("Actions");
    _("Delete");
    _("Box Serial Numbers");
    _("Product SKU");
    _("Expected Quantity");
    _("Actual Quantity");
    _("Missing");
    _("Extra");
    _("Barcode Damage");
    _("Item in Box Serial Numbers");
    _("Loose Items");
    _("Loose Items Serial Numbers");
    _("Product Details");
    _("Product Name");
    _("Product Desc");
    _("Product SKU");
    _("Product Type");
    _("Tote already associated with bin {0}");
    _("Entity Scan not expected. Press PPTL");
    _("Entity Unscannable");
    _("Extra Entities in Bin");
    _("Entity Missing / Unscannable");
    _("Space Not Available");
    _("Item Missing/Unscannable");
    _("Missing Box");
    _("Disassociate Tote");
    _("Override Tote Required")
    _("Reprint");
    _("Skip Print");
    _("Items In Box Unscannable");
    _("Box Unscannable");
    _("Loose Items Unscannable");
    _("Please put unscannable entities in exception area.");
    _("Please put oversized entities in exception area.");
    _("Take the Items out from the Slot");
    _("Pptl press not expected.");
    _("Scan not expected.");
    _("Wrong scan.Expecting item scan.");
    _("Wrong scan.Expecting container scan.");
    _("Wrong scan.Expecting location scan.");
    _("Scan Excess Entity Quantity");
    _("Entity already scanned.Confirm exception");
    _("Entity already scanned.Confirm exception");
    _("Exception");
    _("Logout");
    _("Utility");
    _("EXCEPTION");
    _("Good Quantity");
    _("Missing Quantity");
    _("Unscannable Quantity");
    _("Remove Item");
    _("Item Missing/Bad Barcode");
    _("Sum of missing and good quantity should be equal to {0}");
    _("Login"); 
    _("Enter Username");
    _("Enter Password");
    _("Invalid credentials");
    _("Login not allowed. You're already logged in");
    /* messages in passive navigation */
    _("Place Item in slot and scan more");
    _("PPTL");
    _("Scan Slot Barcode");
    _("Unexpected Item");
    _("Stage Bin or Scan Item");
    _("Scan & Confirm");
    _("Scan Item From Bin");
    _("Scan Tote");
    _("Scan MSU Barcode");
    _("Scan Items");
    _("Status");
    _("Could not connect to PPS.Please try again.");
    /* bininfo modal box */
    _("product_sku");
    _("type");
    _("quantity");
    _("item");
    _("box");
    _("SKU not present in Database.Put in exception area");
    _("Please put extra entities in exception area.");
    _("Space Available For");
    _("Tote Details");
    _("Close current tote first");
    _("CURRENT BIN");
    _("CURRENT SLOT");
    _("Bad Barcode Quantity");
    _("Enter Scanner Id");
    _("Back seat not supported for this mode");
    _("Bad Data");
    _("Peripheral already added");
    _("Scan Bin Barcode");
    _("TOTE");
    _("Update");
    _("Japanese");
    _("English");
    _("Exception Finished");
    _("PPS Mode");
    _("Seat Type");
    _("Good Quantity Cannot be Equal to the Total Quantity");
    /*Rollcage*/
    _("Undock Roll Cage if no items remaining");
    _("Gently push roll cage away from the frame");
    /*Preput */
    _("Scan tote and place it in the slot");
    _("Scan slot to confirm");
    _("Release MTU");
    _("Tote scan successful.");
    _("Slot barcode scan successful");
    _("Tote already scanned");
    _("Tote scanned is not idle");
    _("Tote scanned is not opened");
    _("Scan Tote first and then scan rack");
    _("Invalid Slot scanned");
    _("Tote already associated with slot.Scan empty slot");
    _("Please Scan tote which has excess item");
    _("Exception cancelled");
    _("Tote scan cancelled.");
    _("Exception finished");
    _("Tote already scanned");
    _("Tote scanned is not idle");
    _("Tote scanned is not opened");
    _("Scan Tote first and then scan rack");
    _("Invalid Slot scanned");
    _("Tote already associated with slot.Scan empty slot");
    _("Unexpected entity scanned");
    _("Wrong barcode scanned");
    _("Enter excess item quantity"); 
    _(" items");
    _("Wrong ppsbin button pressed");
    _("Total ");
    _("Place the tote back in bin {0} and press pptl");
    _("Take out the tote from bin {0} and scan entity");
    _("Scan tote first and then scan item");
    _("Scan excess item");
    _("Scan tote which has excess item");
    _("Invalid tote scanned");
    _("Exception entry successful");
    _("Are you sure you want to exit from {0} invoice and stage all bins");
    _("Invoice number: {0}");
    _("Scan or Enter {0} number");
    _("Please scan or enter {0} number");
    _("STN scan successful");
    _("Exit {0}");
    _("{0} number :");
    _("Are you sure you want to exit from {0} {1} and stage all bins");
    _("Scan or Enter the tote barcode to reprint");
    /* Code for pick front container flow*/
    _("Place container in MSU slot and confirm");
    /*Put front unmarked containers */
    _("Place {0} boxes with {1} items from bin {2}");
    _("Place {0} boxes from bin {2}");
    _("Place");
    _("Remove Tote from bin {0} & Press PPTL to confirm no Items Remaining");
    _("Press PPTL to confirm no Items Remaining in Bin {0}");
    _("Entities cannot be accommodated! Remove all entities from bin and press PPTL.");
    _("Entities cannot be accommodated!");
    _("Take {0} Printout and Press PPTL");    
    _("PPS is Closed");
    _("Place box in MSU slot and confirm");
    _("Wrong Undock");
    _("Dock roll cage back to proceed the operation");
    _("Excess quantity");
    _("Entity Damaged");
    _("Issues with {0}");
    _("Validate and Confirm");
    _("Wrong Scan. IRT bin scan expected");
    _("Scan IRT Bin");
    _("Please put damaged entities in IRT bin and scan the bin");
    _("Please put damaged entities in exception area");
    _("Please put extra entities in IRT bin and scan the bin");
    _("Please put extra entities in exception area");
    _("Please put unscannable entities in IRT bin and scan the bin");
    _("Please put unscannable entities in exception area");
    _("Please put oversized entities in IRT bin and scan the bin");
    _("Please put oversized entities in exception area");
    _("Entity Damaged");
    _("Warehouse Full Remove all entities from bin & press PPTL");
    _("Enter Quantity");
    _("Are you sure you want to cancel the exception?");
    _("All scan and print will be cancelled. Confirm to cancel?");
    _("Yes");
    _("No");
    _("Exception with entity reported");
    _("Please put entities with issues, in exception area");
    _("Please put entities in IRT and Scan IRT Bin");
    _("Wrong Scan. Unrecognized barcode.");
    _("PPS is closed");
    _("NEST MAX");
    _("STACK MAX");
    _("DO NOT STACK");
    _("FRAGILE");
    _("Length of {0} should not be greater than {1}");
    _("Scan {0} packs");
    _("Scan {0} sub packs");
    _("Press PPTL");
    _("Pack Scan Successful");
    _("Scan {0} more packs and place in bin {1}");
    _("Scan {0} more sub packs and place in bin {1}");
    _("Put pack list in trolley and press PPTL to confirm");
    _("Scan damaged entity");
    _("Damaged Quantity");
    _("Entity Damaged");
    _("Wrong Scan. Entity not present in Database");
    _("Sum of good, missing and damaged should be equal to {0}");
    _("Last item scan will be cancelled. Do you want to continue?");
    _("Continue");
    _("Bin full");
    _("Please put entities which have issues in exception area");
    _("Unscannable");
    _("Invalid Event.Expecting PPTL button press");
    _("Remove Tote from bin & Press PPTL to confirm no Items Remaining");
    _("Press PPTL to confirm no Items Remaining in Bin {0}");
    _("Wrong entity scan.Please scan the correct entity");
    _("Physically Damaged entity reported.");
    _("Entity entry successful");
    _("Bin scan successful");
    _("Physically Damaged Reported should equal Scanned Quantity");
    _("SKU not present in Database.");
    _("Extra entity scan found.");
    _("Container Already Scanned.");
    _("Invalid Entity Scanned.");
    _("Quantity of Physically damaged entities scanned is less.");
    _("Error");
    _("Waiting for Bins to be Cleared at Pick Front");
    _("Processing Next Pick from Rack ");
    _("Scan Damaged Entity");
    _("Warehouse Full");
    _("Scan a packing box and keep in bin {0}");
    _("Pick box from MSU and press PPTL on Bin {0}");
    _("Extra details entered are incorrect.Please enter correct details");
    _("Packing box scan failed");
    _("Wrong entity Scanned. Bin Scan Expected.");
    _("Bin Already Scanned");
    _("Issue with Pack");
    _("Issue with Sub pack");
    _("Issue with MPU");
    _("Space not available");
    _("Bad barcode on pack");
    _("Bad barcode on sub pack");
    _("Unexpected pack");
    _("Pack missing");
    _("Sub pack missing");
    _("Damaged sub pack");
    _("Good pack");
    _("Good sub pack");
    _("Scan not Allowed. PPS close/force close or profile change requested.");
    _("Reprint");
    _("Pack scan successfully");
    _("Sub-Pack scan successfully");
    _("Scan MPU");
    _("Scan {0} or {1}");
    _("Continue scanning {0} and {1}");
    _("Enter Quantity of Unscannable {0}");
    _("Enter Quantity of Unscannable {0}");
    _("Wait for MPU");
    _("No Sub-Packs to reconcile");
    _("Pack Unscannable");
    _("Sub-Pack Unscannable");
    _("Damage Barcode");
    _("Packs");
    _("Sub-Packs");
    _("Scan Small Box");
    _("Scan {0} Box and Place in Bin {1}");
    _("Scan {0} Small Box and Place in Bin {1}");
    _("Put Pack list in trolley and press PPTL to confirm");
    _("Done");

}

