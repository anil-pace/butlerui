var serverMessages = {
    "PtB.B.001": "Scan Entity or Stage Bin",
    "PtB.H.001" : "Stage Bin or Scan Entity",
    "PtB.H.002" : "Place Entity in Bin and Press PPTL",
    "PtB.H.003": "Are you sure you want to close Tote",
    "PtB.H.004": "Scan Tote or Stage Bin",
    "PtB.H.005" : "Item Not Found in Tote",
    "PtB.H.007" : "Enter Damaged Entity Quantity",
    "PtB.H.008" : "Scan Oversized Entity Quantity",
    "PtB.H.009" : "Please Select The Bin With Excess Entity",
    "PtB.H.010" : "Enter Excess Entity Quantity",
    "PtB.H.011" : "Please put it in IRT bin and confirm",
    "PtB.E.001" : "Tote already opened.Scan some other tote",
    "PtB.E.002" : "Tote already closed.Scan some other tote",
    "PtB.E.003" : "No matching tote found",
    "PtB.E.004" : "Wrong entity scanned. Please scan tote",
    "PtB.E.005" : "No entities added yet. Scan entities and then PPS bin",
    "PtB.E.006" : "Wrong entity scanned. Please scan Container/Item.",
    "PtB.E.007" : "Cannot cancel scan. No scanned box found",
    "PtB.E.008" : "Entity scan not expected.Waiting for button press",
    "PtB.E.009" : "PpsBin selected for put. Cannot be staged",
    "PtB.E.010" : "SKU not present in database. WMS Notified.",
    "PtB.E.011" : "Warehouse Full! Remove all entities from bin number and press PPTL.",
    "PtB.E.012" : "No free Pps bins. Please scan later",
    "PtB.E.013" : "Wrong button pressed. Please try another",
    "PtB.E.014" : "{0} excess quantity of item found in tote",   
    "PtB.E.015" : "Please put it in IRT bin and confirm",
    "PtB.E.016" : "Wrong bin chosen.Try selecting another bin",
    "PtB.E.017" : "Please scan same type of entity to finish this exception.",
    "PtB.E.018" : "Entity scan not expected.",  
    "PtF.H.001" : "Place Entity in Slot and Scan More",
    "PtF.H.002" : "Scan Slot to Confirm",
    "PtF.H.003" : "Wait for MSU",
    "PtF.H.004" : "Scan Entity From Bin {0}",
    "PtF.H.005" : "Enter Good Quantity to be put in slot",
    "PtF.H.006" : "Put Back Entity in PPS Bin",
    "PkF.H.001" : "Wait for MSU",
    "PkF.H.002" : "Confirm MSU Release",
    "PkF.H.003" : "Scan Slot",
    "PkF.H.004" : "Scan {0} Items",
    "PkF.H.005" : "Scan Box",
    "PkF.H.006" : "Scan Items and Place in Bin",
    "PkF.H.007" : "Press PPTL for Bin to confirm",
    "PkB.H.001" : "Scan tote to associate with bin",
    "PkB.H.002" : "Press bin PPTL or scan a tote",
    "PkB.H.003" : "Press PpsBin to remove items",
    "PkB.H.004" : "Press bin PPTL",
    "PkB.H.005" : "Press print button to proceed",
    "PkB.H.006" : "Select Bin to skip print",
    "PkB.H.007" : "Select Bin which does not require tote",
    "PkB.H.008" : "Select Bin to disassociate tote",
    "PtB.I.001" : "Tote scan successful",
    "PtB.I.002" : "PPS is in paused mode. Cannot process new box. Take the entity back.",
    "PtB.I.003" : "Cancel scan successful.",
    "PtB.I.004" : "Tote close successful.",
    "PtB.I.005" : "Tote not closed.",
    "PtB.I.006" : "Entity scan successful.",
    "PtB.I.007" : "Pptl button press successful",
    "PtB.I.008" : "Excess item in tote recorded.Now press Pptl",
    "PtB.I.009" : "Invalid item in tote recorded.",
    "PtB.I.010" : "Damaged entity recorded.WMS Notified.",
    "PtB.I.011" : "extra entity recorded in bin.WMS Notified.",
    "PtB.I.012" : "Oversized entity recorded.WMS notified.",
    "PtB.I.013" : "Exception cancelled successfully",
    "PtB.I.014" : "Cancelled excess entity in tote",
    "PtB.I.015" : "Cancelled invalid entity in tote",
    "PtB.I.016" : "Invalid entity in tote recorded",
    "PtB.W.001" : "Container already stored in the warehouse",
    "PtB.W.002" : "Entity already scanned.Waiting for Pptl button press",
    "PtB.W.003" : "No PpsBins available to stage",
    "PtB.W.004" : "PpsBin already staged. Ignoring event",
    "PtB.W.005" : "PpsBin empty. Cannot be staged",
    "PkF.A.012" : "Scan {0} items",
    "PtF.C.007" :"Waiting for MSU to arrive",
    "PkF.E.011" : "Data capture failed at item",
    "PkF.E.013" : "Scan items and place in Bin {0}",
    "PkF.E.014" : "Press PPTL for Bin {0} to confirm",
    "PkF.D.010" :"Scan box barcode",
    "PkB.A.001" : "Scan Tote to associate with Bin",
    "PkB.A.002" : "Press PpsBin Button Or Scan a Tote",
    "PkB.A.003" : "Press PpsBin {0} to remove items",
    "PkB.B.001" : "Tote is already scanned.Expecting pptl scan.",
    "PkB.B.002" : "Totes are not required.Please don't scan tote barcode",
    "PkB.B.003" : "Wrong PPS bin scanned",
    "PkB.B.004" : "Please scan the tote first and then scan pptl barcode",
    "PkB.B.005": "Tote scanned.Expecting pptl scan.",
    "PkB.B.006": "Pptl scan not allowed. Totes are not required",
    "PkB.B.007": "Tote didn't get associated",
    "PkB.B.008" : "After scannning tote barcode, please scan pptl barcode",
    "PkB.B.009" : "Wrong Ppsbin button pressed.Please press those buttons having color blue",
    "PkB.B.010" : "Please complete process for pending ppsbin and then proceed",
    "PkB.B.011" : "No totes associated. Pease keep totes in the Bin and then scan",
    "PkB.B.012" : "Documents printed Successfully",
    "PkB.B.013": "No tote scanned",
    "PkB.B.014": "Tote cancelled",
    "PkB.B.015" : "Tote already associated with ppsbin",
    "PkB.B.016" : "Please press ppsbin button which does not have any totes associated",
    "PkB.B.017" :"Tote assigned successfully to ppsbin {0}",
    "PkB.B.019":"Bin {0} items removed successfully",
    "PkB.B.020" : "Totes are not required",
    "PkB.B.021" : "Wrong Barcode scanned",
    "PkB.B.022" : "Tote could not be reserved as already reserved",
    "PkB.B.023" : "Exception invalid as totes are not required with this PPS",
    "PkB.B.024" : "Override tote not possible",
    "PkB.B.025" :"Scanning pptl barcode not allowed",
    "PkB.B.027" : "Please press those buttons having color blink_blue",
    "PkB.B.028" : "Unhandled event ocurred",
    "PkB.B.029" : "Barcode didn't match with current tote barcode",
    "Common.000": "Testing configuration {0} and {1}",
    "Common.001": "Processing. Please wait and scan later",
    "Common.002": "Waiting for rack",
    "Common.003": "Current PPS mode does not support back seat. Please logout.",
    "AdF.I.006" : "Extra Box",
    "AdF.A.001" :"Scan Box/Items from Slot",
    "AdF.A.002" :"Scan Remaining Item In Box",
    "AdF.A.004" :"Last Box Scan Completed! Scan Remaining Box/Items",
    "AdF.A.006" :"Status To Reconcile",
    "AdF.A.007" :"This box belongs to some other SKU in the slot.Put it back.Scan next box.",
    "AdF.A.008" :"This box does not belong to this slot. Remove the box and put in exception area.",
    "AdF.A.009" :"Waiting for MSU to arrive",
    "AdF.B.001" :"Wrong Barcode.",
    "AdF.B.002" :"Box Scan successful",
    "AdF.B.003" :"Item Scan successful",
    "CLIENTCODE_001" : "Bin {0} selected",
    "CLIENTCODE_002" : "Bin {0} unselected",
    "CLIENTCODE_003" : "Connection is closed. Connecting...",
    "Audit.A.012":"No Items to Reconcile",
    "CLIENTCODE_004" : "PPTL Management",
    "CLIENTCODE_005" : "Scanner Management",
    "CLIENTCODE_006" : "Scanner added successfully",
    "CLIENTCODE_007" : "Scanner not added",
    "CLIENTCODE_008" : "You cannot enter value more than 9999",
    "CLIENTCODE_009" : "You cannot enter 0",
    "CLIENTCODE_010" : "Quantity should be equal to damaged, missing and good",
    "PkF.I.001" : "Pick Complete. Waiting for next rack.",
    "PkF.I.007" : "Data capture valid so far",
    "PkF.E.012" : "Data capture failed at item {0}",
    "PkF.I.007" : "Data capture valid so far",
    "PkF.I.007" : "Data capture valid so far",    
    "PkF.I.002" : "Location Scan successful",
    "PkF.I.003" : "Box Scan successful",
    "PkF.I.004" : "Item Scan successful",
    "PkF.I.005" : "Cancel Scan successful",
    "PkF.I.006" : "PPTL button press successful",
    "PkF.I.007" : "Data capture valid so far",
    "PkF.W.001" : "Expecting MSU release confirmation from GUI, got invalid event.",
    "PkF.W.002" : "Cannot cancel scan. No Scanned box found",
    "PkF.W.003" : "Data capture failed at item",
    "PkF.E.001" : "Wrong location scan.Scan correct location",
    "PkF.E.002" : "Wrong box scanned. Please try again",
    "PkF.E.003" : "Scan a box first",
    "PkF.E.004" : "Wrong ppsbin button pressed. Please press correct button",
    "PkF.E.005" : "Picked quantity more than expected. Not Allowed",
    "PkF.E.006" : "Wrong item quantity update",
    "PkF.E.007" : "Wrong item scanned. Please scan correct item",
    "PkF.E.008" : "Waiting for rack. Please wait and scan later",
    "PkF.E.009" : "Scanned item details not found",
    "PkF.E.010" : "No PPS bins empty. Please empty them",
    "PkB.E.001" : "Barcode didn't match current tote barcode",
    "PkB.E.002" : "Totes are not required",
    "PkB.E.003" : "Exception invalid",
    "PkB.E.004" : "No totes associated. Please keep totes in bin and then scan",
    "PkB.E.005" : "Wrong pptl pressed",
    "PkB.E.006" : "Tote didn't get associated", 
    "PkB.E.007" : "Totes are anyway not required.Please proceed further",  
    "PkB.I.001" : "Exception cancelled",
    "PkB.I.002" : "Tote scan cancelled",
    "PkB.I.003" : "Documents printed successfully",
    "PkB.I.004" : "Bin entities removed successfully",
    "PkB.I.005" : "Tote assigned successfully to ppsbin",
    "PkB.I.006" : "Please scan pptl",
    "PkB.I.007" : "All totes deassociated from PpsBin ",
    "PkB.W.001" : "Please complete process for pending ppsbin and then proceed",
    "PkB.W.002" : "Tote already reserved",
    "PkB.W.003" : "Wrong barcode scanned",
    "PkB.W.004" : "Please scan the tote first and then scan pptl barcode",
    "PkB.W.005" : "No tote scanned",
    "PkB.W.006" : "Please press pptl for bin which does not have any totes associated",
    "PkB.W.007" : "Pptl scan not allowed. Totes are not required",
    "PkB.W.008" : "Pptl scan not allowed",
    "PkB.W.009" : "Scan pptl barcode after scannning tote barcode",    
    "PtF.E.001" : "Entity scanned is not from bin. Replace and scan from bin",
    "PtF.E.002" : "Wrong entity scanned",
    "PtF.E.003" : "Waiting for MSU scan. Please scan entity later.",
    "PtF.E.004" : "Expected quantity exceeded.",
    "PtF.E.005" : "Wrong scan! Entity scan expected but slot barcode scanned.",
    "PtF.E.006" : "Actual put quantity not equal to sum of Good and Expection quantity.",
    "PtF.E.007" : "Actual put quantity less than than revised quantity.", 
    "PtF.E.008" : "Wrong slot scanned", 
    "PtF.I.001" : "Entity scan successful",
    "PtF.I.002" : "Slot scan successful",
    "PtF.I.003" : "Slot scan successful",
    "PtF.I.004" : "Damaged and missing entity reported.",
    "PtF.I.005" : "Space unavailable reported.",
    "PtF.I.006" : "Unknown Barcode Scanned",
    "PtB002" : "Entity Oversized",
    "PtB003" : "Entity Unscannable",
    "PtB004" : "Extra Entities in Bin",
    "PtF001" : "Entity Mising / Unscannable",
    "PtF002" : "Space Not Available"


};


module.exports = serverMessages;










