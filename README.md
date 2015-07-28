# smarttv-angular-dashboard
> A dashing.io-like angular based dashboard for samsung smarttv.

A standalone web-app that polls for services via angular and ajax.

## Widgets

### Value

Shows a value.

update(data) where data is a string

    $scope.update('52');

### List

Shows a list.

update(data) where data is an object with keys `description` and `value`.

    $scope.update({
        'description': 'This will be the title',
        'value': 'A larger text for the content.'
    });

### Percentage

Shows a visual representation of a percentage.

update(data) where data is an object with keys `value` and `total`.

    $scope.update({
        'value': 10,
        'total': 24
    });

### Image

Shows an image

update(data) where data is a URL of an image

    $scope.update('https://placekitten.com/g/200/300');

### Clock

Shows the current date and time

    <md-grid-tile>
        <ng-widget widget-id="clock" class="red"></ng-widget>
    </md-grid-tile>