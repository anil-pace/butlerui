var serverMessages = {
    "product_sku": "Product SKU",
    "type": "Type",
    "serial": "Serial Number",
    "quantity": "Quantity",
    "PtB.B.001": "Scan item / Stage PPS Bin", 
    "PtB.H.001" : "Stage Bin or Scan Entity",
    "PtB.H.002" : "Place Entity in Bin and Press PPTL",
    "PtB.H.003": "Are You Sure You Want to Close {0}?",
    "PtB.H.004": "Scan {0} or Stage PPS Bin",
    "PtB.H.005" : "Unexpected Entity In {0}",
    "PtB.H.007" : "Enter Unscannable Entity Quantity",
    "PtB.H.008" : "Scan Oversized Entity Quantity",
    "PtB.H.009" : "Please Select The Bin With Excess Entity",
    "PtB.H.010" : "Scan Excess Entity Quantity",
    "PtB.H.011" : "Please put entity in exception area and confirm",
    "PtB.H.015" : "Please put entities in IRT and Scan IRT Bin",
    "PtB.H.016" : "Enter Unscannable {0} Quantity", 
    "PtB.H.017" : "Scan a {0}",
    "PtB.H.018" : "Scan a {0} or Press PPTL",
    "PtB.H.019" : "Press PPTL to clear the Bin",
    "PtB.H.020" : "Waiting for put_away to complete from front",
    "PtB.H.021" : "Place {0} in Bin {1} and Press PPTL",  
    "PtB.E.001" : "{0} already opened. Scan some other {1}", 
    "PtB.E.002" : "{0} already closed. Scan some other {1}", 
    "PtB.E.003" : "Close current {0} first",
    "PtB.E.004" : "Wrong entity scanned. Please scan {0}",
    "PtB.E.005" : "No entities added yet. Scan entities and then press PPTL",
    "PtB.E.006" : "Wrong entity scanned. Please scan Container/Item.",
    "PtB.E.007" : "Cannot cancel scan. No scanned entity found",
    "PtB.E.008" : "Entity scan not expected. Waiting for PPTL press",
    "PtB.E.009" : "Bin selected for put. Cannot be staged",
    "PtB.E.010" : "SKU not present in database. Put into IRT bin.",
    "PtB.E.011" : "Entities cannot be accommodated! Remove all entities from bin {0} and press PPTL",
    "PtB.E.012" : "No free bins. Please scan later",
    "PtB.E.013" : "Wrong PPTL pressed. Please try another",
    "PtB.E.014" : "{0} excess entities found in {0}. Please put entities in exception area and confirm", 
    "PtB.E.015" : "Entity not expected in {0}. Please put entity in exception area and confirm",
    "PtB.E.016" : "Wrong bin chosen.Try selecting another bin",
    "PtB.E.017" : "Please scan same SKU to complete this exception",
    "PtB.E.018" : "Expecting {0} closure.",  
    "PtB.E.019" : "{0} not present in database.",
    "PtB.E.020" : "{0} matched .",
    "PtB.E.021" : "Entity already scanned.Confirm exception", 
    "PtB.E.023" : "Scan not Allowed. PPS close/force close or profile change requested.",
    "PtB.E.024" : "Length of {0} should not be greater than {1}",
    "PtF.H.001" : "Place Entity in Slot and Scan More",
    "PtF.H.002" : "Scan Slot to Confirm",
    "PtF.H.003" : "Wait for MSU",
    "PtF.H.004" : "Scan Entity From Bin {0}",
    "PtF.H.005" : "Enter Quantity",
    "PtF.H.006" : "Put Back Entities in the PPS Bin",
    "PtF.H.007" : "Undock Roll Cage if no items remaining",
    "PtF.H.008" : "Place the {0} back in bin {1} and press PPTL",  
    "PtF.H.009" : "Scan excess item",
    "PtF.H.010" : "Scan {0} which has excess item",
    "PtF.H.011" : "Take out the {0} from bin {1} and scan entity",             
    "PtF.H.012" : "Place {0} boxes from bin {2}",                             
    "PtF.H.013" : "Place {0} boxes with {1} items from bin {2}",
    "PtF.H.016" : "Warehouse Full",
    "PtF.H.017" : "Wrong Undock",
    "PtF.H.018" : "Remove {0} from bin {1} & Press PPTL to confirm no Items Remaining", 
    "PtF.H.019" : "Press PPTL to confirm no Items Remaining in Bin {0}",
    "PtF.H.020" : "Warehouse Full Remove all entities from bin & press PPTL",
    "PtF.H.021" : "Scan IRT Bin",
    "PtF.H.022" : "Scan {0} damaged entities",
    "PkF.H.001" : "Wait for MSU",
    "PkF.H.002" : "Confirm MSU Release",
    "PkF.H.003" : "Scan Slot",
    "PkF.H.004" : "Scan {0} Items",
    "PkF.H.005" : "Scan box from MSU slot",
    "PkF.H.006" : "Scan {0} Items and Place in Bin {1}",
    "PkF.H.007" : "Press PPTL to confirm",
    "PkF.H.008" : "Waiting for Bins to be Cleared at Pick Back",
    "PkF.H.009" : "Processing Next Pick from Rack ",
    "PkF.H.010" : "Scan a packing box and keep in bin {0}",
    "PkF.H.011" : "Place box in MSU slot and confirm",
    "PkF.H.012" : "Pick box from MSU and press PPTL on Bin {0}",
    "PkF.H.013" : "Scan {0} damaged entities",
    "PkF.H.014" : "Waiting for Bins to be Cleared at Pick Front",
    "PkF.H.015" : "Enter Quantity",
    "PkF.H.023" : "Scan {0} items and place on the table",
    "PkF.H.024" : "Place {0} items in bin {1} and press PPTL to confirm",
    "PkF.H.025" : "Paste Printout on the item and confirm",
    "PkF.H.026" : "Waiting for {0} to be associated from back",
    "PkF.H.027" : "Scan {0} to Open",
    "PkB.H.001" : "Scan a {0}",
    "PkB.H.002" : "Press PPTL or Scan a {0}",
    "PkB.H.003" : "Press PPTL to clear the bin",
    "PkB.H.004" : "Press bin PPTL to remove entities",
    "PkB.H.005" : "Press print button to proceed",
    "PkB.H.006" : "Select Bin to skip print",
    "PkB.H.007" : "Select Bin which does not require {0}",
    "PkB.H.008" : "Select Bin to disassociate {0}",
    "PkB.H.009" : "Place {0} in Bin and scan the Bin barcode",
    "PkB.H.010" : "Waiting for order to be completed from front",
    "PkB.H.011" : "Waiting for {0} to be associated from back",
    "PtB.I.001" : "{0} scan successful.",
    "PtB.I.002" : "PPS is in paused mode. Cannot process new entity. Try after some time",
    "PtB.I.003" : "Cancel scan successful.",
    "PtB.I.004" : "{0} close successful.",
    "PtB.I.005" : "{0} not closed.",
    "PtB.I.006" : "Entity scan successful.",
    "PtB.I.007" : "PPTL press successful",
    "PtB.I.008" : "Excess item in {0} recorded. Now press PPTL",
    "PtB.I.009" : "Excess Entity in {0} recorded.",
    "PtB.I.010" : "{0} Unscannable entities recorded. WMS notified",
    "PtB.I.011" : "{0} extra entities recorded in bin. WMS notified",
    "PtB.I.012" : "{0} oversized entities recorded.WMS notified",
    "PtB.I.013" : "Exception cancelled",
    "PtB.I.014" : "Cancelled excess entity in {0}",
    "PtB.I.015" : "Cancelled invalid entity in {0}",
    "PtB.I.016" : "Invalid entity in {0} recorded",
    "PtB.I.017" : "PPS mode change requested:scan not allowed",
    "PtB.I.018" : "PPS mode change requested:auto staging all bins",
    "PtB.I.020" : "{0} Physically damaged entity recorded.WMS notified",
    "PtB.W.001" : "Box with same serial number already exists in the warehouse",
    "PtB.W.002" : "Entity already scanned.Waiting for PPTL press",
    "PtB.W.003" : "No bins available to stage",
    "PtB.W.004" : "Bin already staged. Ignoring event",
    "PtB.W.005" : "Bin empty. Cannot be staged",
    "PkF.A.012" : "Scan {0} items",
    "PtF.C.007" :"Waiting for MSU to arrive",
    "PkF.D.010" :"Scan box barcode",
    "PkB.A.001" : "Scan {0} to associate with Bin",
    "PkB.A.002" : "Press PpsBin Button Or Scan a {0}",
    "PkB.A.003" : "Press PpsBin {0} to remove items",
    "PkB.B.001" : "{0} is already scanned.Expecting pptl scan.",
    "PkB.B.002" : "{0} are not required.Please don't scan {1} barcode",
    "PkB.B.003" : "Wrong PPS bin scanned",
    "PkB.B.004" : "Please scan the {0} first and then scan pptl barcode",
    "PkB.B.005": "{0} scanned.Expecting pptl scan.",
    "PkB.B.006": "Pptl scan not allowed. {0} are not required",
    "PkB.B.007": "{0} didn't get associated",
    "PkB.B.008" : "After scannning {0} barcode, please scan pptl barcode",
    "PkB.B.009" : "Wrong Ppsbin button pressed.Please press those buttons having color blue",
    "PkB.B.010" : "Please complete process for pending ppsbin and then proceed",
    "PkB.B.011" : "No {0} associated. Pease keep {0} in the Bin and then scan",
    "PkB.B.012" : "Documents printed Successfully",
    "PkB.B.013": "No {0} scanned",
    "PkB.B.014": "{0} cancelled",
    "PkB.B.015" : "{0} already associated with ppsbin",
    "PkB.B.016" : "Please press ppsbin button which does not have any {0} associated",
    "PkB.B.017" :"{0} assigned successfully to ppsbin {0}",
    "PkB.B.019":"Bin {0} items removed successfully",
    "PkB.B.020" : "{0} are not required",
    "PkB.B.021" : "Wrong Barcode scanned",
    "PkB.B.022" : "{0} could not be reserved as already reserved",
    "PkB.B.023" : "Exception invalid as {0} are not required with this PPS",
    "PkB.B.024" : "Override {0} not possible",
    "PkB.B.025" :"Scanning pptl barcode not allowed",
    "PkB.B.027" : "Please press those buttons having color blink_blue",
    "PkB.B.028" : "Unhandled event ocurred",
    "PkB.B.029" : "Barcode didn't match with current {0} barcode",
    "PkB.B.030" : "PPS Mode",
    "PkB.B.031" : "Seat Type",
    "Common.I.000": "Testing configuration {0} and {1}",
    "Common.E.001": "Processing. Please wait and scan later",
    "Common.I.002": "Waiting for rack",
    "Common.I.003": "Current PPS mode does not support back seat. Please logout.",
    "Common.E.004": "PPTL press not expected.",
    "Common.E.005": "Scan not expected.",
    "Common.E.006": "Wrong scan.Expecting item scan.",
    "Common.E.007": "Wrong scan.Expecting container scan.",
    "Common.E.008": "Wrong scan.Expecting location scan.",
    "Common.E.009": "SKU not present in Database.",
    "Common.E.010": "Wrong Scan. Unrecognized barcode.",
    "Common.E.011": "Wrong Scan. IRT bin scan expected",
    "Common.E.012": "{0} unexpected. {0} in use in another location",
    "Common.E.013": "{0} unexpected. Service request not present in {0}.",
    "Common.E.014": "Invalid resource.",
    "Common.E.015": "{0} unexpected. Service request not in correct state.",
    "Common.E.016": "{0} unexpected. Empty {0} scanned.",
    "Common.E.017": "{0} unexpected. Scanned {0} does not exist.",
    "Common.E.018": "{0} unexpected. Service Request does not exist.",
    "Common.E.019": "Wrong scan. Please Scan item or {0}",
    "Common.E.020": "{0} unexpected. {0} is not empty.",
    "Common.E.021": "Bin barcode of other PPS scanned",
    "AdF.I.003" : "Item scan successful",
    "AdF.I.004" : "Box Completed",
    "AdF.I.006" : "Extra Box",
    "AdF.I.008" : "Cancel audit successful.Audit Restarted",
    "AdF.I.010" : "Exception Finished",
    "AdF.I.011" : "{0} scan successfully",
    "AdF.I.012" : "{0} scan successfully",
    "AdF.A.001" :"Scan Box/Items from Slot",
    "AdF.A.002" :"Scan Remaining Item In Box",
    "AdF.A.004" :"Last Box Scan Completed! Scan Remaining Box/Items",
    "AdF.A.006" :"Status To Reconcile",
    "AdF.A.007" :"This box belongs to some other SKU in the slot.Put it back.Scan next box.",
    "AdF.A.008" :"This box does not belong to this slot. Remove the box and put in exception area.",
    "AdF.H.001" : "Scan Box or Items",
    "AdF.H.002" : "Scan Remaining Items in Box",
    "AdF.H.010" : "Scan MPU",
    "AdF.H.011" : "Scan {0} or {1}",
    "AdF.H.012" : "Continue scanning {0} and {1}",
    "AdF.H.013" : "Enter Quantity of Unscannable {0}",
    "AdF.H.014" : "Enter Quantity of Unscannable {0}",
    "AdF.H.015" :"Wait for MPU",
    "AdF.H.006" :"Check Count",
    "AdF.H.007" :"Wait for MSU",
    "AdF.H.008" : "Scan Slot",
    "AdF.H.009" : "Enter Unscannable Entity Quantity",
    "AdF.B.001" :"Wrong Barcode",
    "AdF.B.002" :"Box Scan successful",
    "AdF.B.003" :"Item Scan successful",
    "AdF.B.004"    : "No {0} or {1} to reconcile",
    "CLIENTCODE_001" : "Bin {0} selected",
    "CLIENTCODE_002" : "Bin {0} unselected",
    "CLIENTCODE_003" : "Connection is closed. Connecting...",
    "CLIENTCODE_409" : "Back seat not supported for this mode",
    "CLIENTCODE_412" : "Login not allowed. You're already logged in",
    "CLIENTCODE_503" : "Could not connect to PPS . Please try again",
    "CLIENTCODE_403" : "PPS is Closed",
    "CLIENTCODE_401" : "Invalid Credentials",
    "Audit.A.012"    : "No Items To Reconcile",
    "CLIENTCODE_004" : "PPTL Management",
    "CLIENTCODE_005" : "Scanner Management",
    "CLIENTCODE_006" : "Peripheral added successfully",
    "CLIENTCODE_007" : "Peripheral not added",
    "CLIENTCODE_008" : "You cannot enter value more than 9999",
    "CLIENTCODE_009" : "Please enter a quantity greater than 0",
    "CLIENTCODE_010" : "Sum of good and exception quantity should be equal to {0}",
    "CLIENTCODE_011" : "Sum of missing and good quantity should be equal to {0}",
    "CLIENTCODE_012"  : "Quantity should be less than or equal to {0}",
    "CLIENTCODE_013" : "You are not allowed to keyed in the quantity from the numpad. Force Scan is required.",
    "CLIENTCODE_014" : "Place extra entity in Exception area.",
    "CLIENTCODE_015" : "Peripheral deleted successfully",
    "CLIENTCODE_016" : "Peripheral not deleted successfully",
    "CLIENTCODE_017" : "Good Quantity Cannot be Equal to the Total Quantity",
    "CLIENTCODE_018" : "Sum of good, missing and damaged should be equal to {0}",
    "CLIENTCODE_409_PERIPHERAL" : "Peripheral already added",
    "CLIENTCODE_400" : "Bad Data",
    "CLIENTCODE_400_PERIPHERAL":"Bad Data",
    "PkF.I.001" : "Pick complete. Waiting for next rack.",
    "PkF.I.007" : "Data capture valid",
    "PkF.E.012" : "Data capture failed at item {0}",       
    "PkF.I.002" : "Location scan successful",
    "PkF.I.003" : "Box scan successful",
    "PkF.I.004" : "{0} scan successful",
    "PkF.I.005" : "Cancel scan successful",
    "PkF.I.006" : "PPTL press successful",
    "PkF.I.007" : "Data capture valid so far",
    "PkF.W.001" : "Expecting MSU release confirmation from GUI, got invalid event.",
    "PkF.W.002" : "Cannot cancel scan. No Scanned box found",
    "PkF.W.003" : "Data capture failed at item",
    "PkF.E.001" : "Wrong slot location scanned. Please try again",
    "PkF.E.002" : "Wrong box scanned. Please try again",
    "PkF.E.003" : "Scan a box first",
    "PkF.E.004" : "Wrong PPTL pressed. Please press correct PPTL",
    "PkF.E.005" : "Picked quantity more than expected. Put extra items back in MSU",
    "PkF.E.006" : "Wrong item quantity update",
    "PkF.E.007" : "Wrong item scanned. Please scan correct item",
    "PkF.E.008" : "Waiting for MSU. Please wait and scan later",
    "PkF.E.009" : "System Error. Scanned entity details not available at this time",
    "PkF.E.010" : "No PPS bins empty. Please empty them from Pickback",
    "PkF.E.011" : "Extra details entered are incorrect.Please enter correct details",
    "PkF.E.012" : "Data capture failed at item {0}",
    "PkF.E.013" : "Invalid Event.Expecting PPTL button press",
    "PkF.E.014" : "Packing box scan failed",
    "PkF.E.015" : "Wrong entity scan.Please scan the correct entity",
    "PkF.E.017" : "Extra entity scan found.",
    "PkF.E.018" : "Physically Damaged Reported should equal Scanned Quantity",
    "PkB.E.001" : "Incorrect {0} barcode scanned. Please try again",
    "PkB.E.002" : "System not configured for {0}",
    "PkB.E.003" : "Invalid Exception for this configuration",
    "PkB.E.004" : "{0} association required",
    "PkB.E.005" : "Wrong PPTL pressed",
    "PkB.E.006" : "{0} association failed. Repeat scan operation",
    "PkB.E.007" : "{0} are anyway not required.Please proceed further", 
    "PkB.E.008": "{0} already associated with bin {0}",
    "PkB.E.009": "Entity Scan not expected. Press PPTL",
    "PkB.E.010" : "{0} in use at front seat",
    "PkB.E.011" : "{0} cannot be associated with bin of another seat",
    "PkB.I.001" : "Exception cancelled",
    "PkB.I.002" : "{0} scan cancelled",
    "PkB.I.003" : "Documents printed successfully",
    "PkB.I.004" : "Order removed successfully from bin {0}",
    "PkB.I.005" : "{0} assigned successfully to bin",
    "PkB.I.006" : "Please scan PPTL barcode",
    "PkB.I.007" : "{0} disassociated from Bin",
    "PkB.I.008" : "{0} scan successful.",
    "PkB.W.001" : "Please complete pickback for pending bin and then proceed",
    "PkB.W.002" : "{0} associated with another bin",
    "PkB.W.003" : "Wrong barcode scanned",
    "PkB.W.004" : "Please scan the {0} first and then scan PPTL barcode",
    "PkB.W.005" : "No {0} scanned",
    "PkB.W.006" : "Override {0} Exception cannot be raised for bins with {1} associated",
    "PkB.W.007" : "PPTL scan not allowed. System not configured for {0}",
    "PkB.W.008" : "PPTL scan not allowed",
    "PkB.W.009" : "Scan pptl barcode after scannning {0} barcode",
    "PtF.E.001" : "Entity scanned is not from bin {0}. Replace and scan from bin {1}",
    "PtF.E.002" : "Wrong entity scanned",
    "PtF.E.003" : "Waiting for MSU scan. Please scan entity later.",
    "PtF.E.004" : "Expected quantity exceeded.",
    "PtF.E.005" : "Wrong scan! Entity scan expected but slot barcode scanned.",
    "PtF.E.006" : "Total Quantity Expected {0}. Quantity entered {1}",
    "PtF.E.007" : "Actual put quantity less than than revised quantity.", 
    "PtF.E.008" : "Wrong slot scanned", 
    "PtF.E.010" : "Wrong ppsbin button pressed",
    "PtF.E.011" : "{0} scanned is not opened",
    "PtF.E.012" : "Scan {0} first and then scan item",
    "PtF.E.013" : "{0} already scanned",
    "PtF.E.014" : "Invalid {0} scanned",
    "PtF.E.015" : "Extra entity scan found.",
    "PtF.E.016" : "Container Already Scanned.",
    "PtF.E.017" : "Invalid Entity Scanned.",
    "PtF.E.018" : "Quantity of Physically damaged entities scanned is less.",
    "PtF.E.019" : "Wrong entity Scanned. Bin Scan Expected.",
    "PtF.E.020" : "Wrong entity Scanned. {0} Scan Expected.",
    "PtF.E.021" : "Bin Already Scanned",
    "PtF.E.022" : "Entities cannot be accommodated!",
    "PtF.E.023" : "Wrong Bin Scanned. Scan Expected for Roll Cage ready for undocking.",
    "PtF.I.001" : "Entity scan successful",
    "PtF.I.002" : "Slot scan successful",
    "PtF.I.003" : "Slot scan successful",
    "PtF.I.004" : "Exception with entity reported",
    "PtF.I.005" : "Space unavailable recorded.",
    "PtF.I.006" : "Cancel scan successful",
    "PtF.I.007" : "Exception entry successful",
    "PtF.I.008" : "Physically Damaged entity reported.",
    "PtF.I.009" : "Entity entry successful",
    "PtF.I.010" : "Bin scan successful",
    "PtB002" : "Entity Oversized",
    "PtB003" : "Entity Unscannable",
    "PtB004" : "Extra Entities in Bin",
    "PtF001" : "Issues with entity",
    "PtF005" : "Entity Missing",
    "PtF002" : "Space Not Available",
    "PtF003" : "Excess quantity",
    "PkF001" : "Issues with {0}",
    "PkF005" : "Missing/Unscannable Box",
    "PkF006" : "Entity Damaged",
    "PkF010" : "Issue With {0}",
    "PkB007" : "Disassociate {0}",
    "PkB008" : "Override {0} Required",
    "PkB009" : "Reprint",
    "PkB010" : "Skip Print",
    "AdF001" : "Items In Box Unscannable",
    "AdF002" : "Box Unscannable",
    "AdF003" : "Loose Items Unscannable",
    "PkF007" : "Issue with Pack",
    "PkF008" : "Issue with Sub pack",
    "AdF004" : "Pack Unscannable",
    "AdF005" : "Sub-Pack Unscannable",
    "PpB.H.001" : "Scan {0}",
    "PpB.H.002" : "Scan slot",
    "PpB.H.003" : "Scan {0} which has excess item",
    "PpB.H.004" : "Scan excess item",
    "PpB.H.005" : "Release MTU",
    "Ppb.H.006" : "Scan or Enter the {0} barcode to reprint",
    "PpB.I.001" : "{0} scan successful.",
    "PpB.I.002" : "Slot barcode scan successful",
    "PpB.I.003" : "Exception cancelled",
    "PpB.I.004" : "{0} scan cancelled.",
    "PpB.I.005" : "Exception finished",
    "PpB.E.001" : "{0} already scanned",
    "PpB.E.002" : "{0} scanned is not idle",
    "PpB.E.003" : "{0} scanned is not opened",
    "PpB.E.004" : "Scan {0} first and then scan rack",
    "PpB.E.005" : "Invalid Slot scanned",
    "PpB.E.006" : "{0} already associated with slot.Scan empty slot",
    "PpB.E.007" : "Unexpected entity scanned",
    "PpB.E.008" : "Wrong barcode scanned",
    "PpB.E.009" : "Scan {0} first and then scan item",
    "PpB.E.010" : "Invalid {0} scanned",
    "PpB001" : "Enter excess item quantity"  ,
    "PkF.E.014":"Packing box scan failed",
    "PkF.I.008":"Packing box closed",
    "PkF.I.009":"Packing box discarded",
    "PkF.H.011":"Place box in MSU slot and confirm",
    "PkF.H.010":"Scan a packing box and keep in bin {0}",
    "PkF.H.012":"Pick box from MSU and press PPTL on Bin {0}",
    "PkF.H.015":"Enter Quantity",
    "PkF.H.016":"Take {0} Printout and Press PPTL",
    "PpB.E.009" : "Scan {0} first and then scan item",
    "PpB.E.010" : "Invalid {0} scan",
    "PpB001" : "Excess quantity",
    "PtB.H.012" : "Scan or Enter {0} number",
    "PtB.I.019" : "STN scan successful", // not generic from backend 
    //codes for front end
    "FRNT.PBI.01" : "Please scan or enter {0} number",
    "FRNT.PBI.02" : "Exit {0}",
    "FRNT.PBI.03" : "{0} number :",
    "FRNT.PBIM.01" : "Are you sure you want to exit from {0} {1} and stage all bins",
    //SR PICK FLOW
    "PkF.H.017":"Scan {0} {1}",
    "PkF.H.018":"Scan {0} {1} and place in Bin {2}",
    "PkF.H.021":"Put Pack list in trolley and press PPTL to confirm",
    "PkF.H.022":"Waiting for roll cage to be docked",
    "PtB.H.020":"Waiting for put_away to complete from front",
    "UdpF.I.001" : "{0} scan successful",
    "UdpF.I.002" : "Entity scan successful",
    "UdpF.I.003" : "Cancel scan successful",
    "UdpF.I.004" : "{0} Close Cancelled",
    "UdpF.I.005" : "{0} docked successfully",
    "UdpF.I.006" : "Slot scan successful",
    "UdpF.I.007" : "{0} close successful",
    "UdpF.E.001" : "Close current {0} first",
    "UdpF.E.002" : "Wrong entity scanned. Please scan {0}",
    "UdpF.E.003" : "PPS bin already docked",
    "UdpF.E.004" : "Wrong entity scanned. Waiting for ppsbin scan",
    "UdpF.E.005" : "Wrong entity scan.Please scan item",
    "UdpF.E.006" : "Wrong entity scanned. Waiting for slot scan",
    "UdpF.E.007" : "Wrong slot scanned",
    "UdpF.H.001" : "Scan new {0}",
    "UdpF.H.002" : "Scan PPS bin barcode",
    "UdpF.H.003" : "Scan item or {0}",
    "UdpF.H.004" : "Put item in slot and scan slot to confirm",
    "UdpF.H.005" : "Wait for MSU"

};


module.exports = serverMessages;










