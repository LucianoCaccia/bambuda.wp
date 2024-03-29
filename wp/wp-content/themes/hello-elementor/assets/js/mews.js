// Booking Engine Widget load by Luciano Caccia


flatpickr('#calendar-range', {
    "mode": "range",
    minDate: "today",
    altInput: true,
    altFormat: "M j",
    altInputClass: "calendar-input",
    dateFormat: "Y-m-d",
    currentYear: true
});
let calendar = document.getElementById('calendar-range');

// Define element 'selectLocation'
// To implement a fixed location: 
// - set the <select> to 'hidden'
// - Choose the <select> option default using 'selected'
let selectLocation = document.getElementById("selectlocation");

// reloadWidget() asign configId from selectlocation input select and loadWidget()
function reloadWidget() {
    // Change the submit btn to disabled before loadWidget() 
    const submitButton = document.getElementById('availability');
    submitButton.value = 'Loading...';
    submitButton.disabled = true;
    let configId = selectLocation.value;
    loadWidget(configId);    
}
reloadWidget()

// Load the widget by the hotel selected asigned in configId
function loadWidget(configId) {
    let iframe = document.querySelectorAll('iframe[class="mews-distributor"]');
    if (iframe) {iframe.forEach(el => el.remove());} // remove all mews iframe
    Mews.Distributor(
        // Set Configuration ID of your booking engine.
        {
            configurationIds: [configId],
            openElements: '.distributor-pepe',
        },
        
        // Add callback which will enable Submit button and open the Booking Engine Widget upon button click.
        function (api) {
            // Listen on submit and when user submits, open booking engine with given dates.
            const listenOnSubmit = () => {
                let formOk = false;
                // Find the form in DOM and listen on submit.
                const form = document.getElementById('date-form');
                form.addEventListener('submit', event => {
                    // Don't use the default submit button behavior. We want to handle it ourselves.
                    let val = calendar.value;
                    let configId = selectLocation.value;
                    if (val != '' && configId != 'none') {  // If calendar is not empty
                        event.preventDefault();
                        // Get the dates from the date form.
                        const { start, end } = event.target.elements;    
                        const dateRange = calendar.value.split(' to ');
                        const [startYears, startMonths, startDays] = dateRange[0].split('-');
                        const [endYears, endMonths, endDays] = dateRange[1].split('-');
                        const startDate = new Date(startYears, startMonths - 1, startDays);
                        const endDate = new Date(endYears, endMonths - 1, endDays);

                        // Use the Booking Engine Widget Javascript API to set the dates in the widget and open it.
                        api.setStartDate(startDate);
                        api.setEndDate(endDate);
                        api.setLanguageCode('en-US');
                        api.setAdultCount(parseInt(adultos.value));
                        api.setVoucherCode(vouchercode.value);
                        api.open();                        
                    } else {
                        if (configId == 'none') {
                            // Change the select color to warning
                            document.getElementById('selectlocation').classList.add("warning");
                            setTimeout(function(){
                                document.getElementById('selectlocation').classList.remove("warning");
                            }, 700);
                            event.preventDefault();
                            return
                        }
                        if (val == '') {
                            // Focus on calendar element if it's empty
                            document.getElementById('calendar-range').focus();
                            event.preventDefault();
                            return
                        }

                    }
                });
            };
            listenOnSubmit();
    
            // Enable the submit button, because the Booking Engine Widget is ready to be used.
            const enableSubmit = () => {
                const submitButton = document.getElementById('availability');
                submitButton.value = 'View Availability';
                submitButton.disabled = false;
            };
            enableSubmit();
        }
    );
}
