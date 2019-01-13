function initRandFields(){
  $("#barcodex").val(DevModeUtils.makeid());
  $("#nstote_toteid").val(DevModeUtils.makeid());
};

$(document).ready(function() {
  $("#CP").draggable();
  getAuthToken();
  initRandFields();
//   if (StateDataJson && StateDataJson.state_data && StateDataJson.state_data.rack_details) $("#rackdetails").val(JSON.stringify(StateDataJson.state_data.rack_details));

});
