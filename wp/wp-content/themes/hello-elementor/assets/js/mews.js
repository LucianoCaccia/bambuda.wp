// Booking Engine Widget load by Luciano Caccia
// Define element 'radioHotel'
let radioHotel = document.querySelectorAll('input[name="hotel"]');

// reloadWidget() asign configId from radioHotel input radio and loadWidget()
function reloadWidget(_radioHotel) {
    // Change the submit btn to disabled before loadWidget() 
    const submitButton = document.getElementById('availability');
    submitButton.value = 'Loading...';
    submitButton.disabled = true;
    for (let i = 0; i < radioHotel.length; i++) {
        if (radioHotel[i].checked) {
            let configId = radioHotel[i].value;
            loadWidget(configId);
        }
    }
}
reloadWidget()

// Listen radioHotel changes to reloadWidget()
radioHotel.forEach(radioHotel => radioHotel.addEventListener('change', () => reloadWidget()));

// Load the widget by the hotel selected asigned in configId
function loadWidget(configId) {
    let iframe = document.querySelectorAll('iframe[class="mews-distributor"]');
    if (iframe) {
        iframe.forEach(el => el.remove());
    }
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
                // Find the form in DOM and listen on submit.
                const form = document.getElementById('date-form');
                form.addEventListener('submit', event => {
                    // Don't use the default submit button behavior. We want to handle it ourselves.
                    event.preventDefault();

                    // Get the dates from the date form.
                    const { start, end } = event.target.elements;
                    const [startYears, startMonths, startDays] = start.value.split('-');
                    const [endYears, endMonths, endDays] = end.value.split('-');
                    const startDate = new Date(startYears, startMonths - 1, startDays);
                    const endDate = new Date(endYears, endMonths - 1, endDays);
    
                    // Use the Booking Engine Widget Javascript API to set the dates in the widget and open it.
                    api.setStartDate(startDate);
                    api.setEndDate(endDate);
                    api.setLanguageCode('en-US');
                    api.setAdultCount(parseInt(adultos.value));
                    api.setVoucherCode(vouchercode.value);
                    api.open();
                });
            };
    
            listenOnSubmit();
    
            // Enable the submit button, because the Booking Engine Widget is ready to be used.
            const enableSubmit = () => {
                const submitButton = document.getElementById('availability');
                submitButton.value = 'Check Availability';
                submitButton.disabled = false;
            };
            enableSubmit();
        }
    );
}