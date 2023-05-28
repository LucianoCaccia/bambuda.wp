
## How to implement Mews integration
### 1- Add the files inside the hello-elementor

    /assets/js/mews.js
    /assets/images/calendar-regular.svg
    /mews.css

### 2- Add sniped into footer.php

Add this code before ```<?php wp_footer(); ?>```
```php
	<!-- Implement Mews Integration -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
	<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
	<script src="<?php echo get_template_directory_uri(); ?>/assets/js/mews.js"></script>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/mews.css">
	<!-- Implement Mews Integration -->

```


### 3- Edit the page with Elementor

### 4- Add a new container and add a new HTML block

Add the following code inside a new HTML block.

```html
<form id="date-form" name="bookingform">
    <div class="form-field">
        <select onchange="reloadWidget()" class="form-select form-control" id="selectlocation" name="selectlocation" required>
            <option selected value="6dcea3c6-1445-4895-bbce-aeb000f8fac1">Panamá | Bocas Town</option>
            <option value="47febc47-cf48-4e2a-a5ba-aecc00e6b8c3">Panamá | Castle</option>
            <option value="ecd427d8-c56f-42d1-954e-aecc00e985c7">Panamá | Lodge</option>
        </select>
    </div>

    <div class="form-field">
        <input id="calendar-range" class="form-control" placeholder="Check In - Check Out" required name="calendar">
    </div>

    <div class="form-field">
        <select class="form-select form-control" id="adultos" required>
            <option selected value="1">Guest: 1</option>
            <option value="2">Guests: 2</option>
            <option value="3">Guests: 3</option>
            <option value="4">Guests: 4</option>
            <option value="5">Guests: 5</option>                            
            <option value="6">Guests: 6</option>
            <option value="7">Guests: 7</option>                            
            <option value="8">Guests: 8</option>
            <option value="9">Guests: 9</option>                            
            <option value="10">Guests: 10</option>                            
        </select>
    </div>
    <div class="form-field">
        <input type="text" class="form-control" id="vouchercode" value="" aria-describedby="textHelp" placeholder="Promo code">
    </div>
    <div class="form-field">
        <input type="submit" class="btn btn-success" id="availability" value="Loading..." disabled />
    </div>
</form>
```

### 5- Set the container

Width: 874px (Homepage)
Width: 650px (For hotels with no select location field)
Justify Content: Center




