$(document).ready(function () {
    $('#fetch-products').on('click', function () {
        $.ajax({
            type: 'GET',
            url: '/api/product',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            success: function (products) {
                displayProductList(products);
            },
            error: function (error) {
                console.error('Error fetching products:', error.responseJSON.message);
            }
        });
    });
    $('#product-list').on('click', 'tr', function () {
        var productId = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: '/api/product/' + productId,
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            success: function (product) {
                displayProductDetails(product);
            },
            error: function (error) {
                console.error('Error fetching product details:', error.responseJSON.message);
            }
        });
    });

    $('#create-product').on('click', function () {
        var productName = $('#product-name').val();
        var productPrice = parseFloat($('#product-price').val());
        if (productName && !isNaN(productPrice)) {
            var newProduct = { name: productName, price: productPrice };
            $.ajax({
                type: 'POST',
                url: '/api/product/create',
                data: newProduct,
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                },
                success: function (response) {
                    console.log(response.message);
                    $('#product-name').val('');
                    $('#product-price').val('');
                },
                error: function (error) {
                    console.error('Error creating a new product:', error.responseJSON.message);
                }
            });
        }
    });

    function displayProductList(products) {
        var table = '<table><tr><th>Name</th><th>Price</th></tr>';
        products.forEach(function (product) {
            table += '<tr data-id="' + product._id + '"><td>' + product.name + '</td><td>' + product.price + '</td></tr>';
        });
        table += '</table>';
        $('#product-list').html(table);
    }
    function displayProductDetails(product) {
        var details = '<div>';
        details += '<p><strong>Name:</strong> ' + product.name + '</p>';
        details += '<p><strong>Price:</strong> ' + product.price + '</p>';
        details += '</div>';
        details += '<input type="text" id="update-product-name" placeholder="Updated Name">';
        details += '<input type="number" id="update-product-price" placeholder="Updated Price">';
        details += '<button id="update-product" data-id="' + product._id + '">Update Product</button>';
        details += '<button id="delete-product" data-id="' + product._id + '">Delete Product</button>';
        $('#product-details').html(details).show();
    }
    $('#product-details').on('click', '#update-product', function () {
        var productId = $(this).data('id');
        var updatedName = $('#update-product-name').val();
        var updatedPrice = parseFloat($('#update-product-price').val());

        if (updatedName && !isNaN(updatedPrice)) {
            var updatedProduct = { name: updatedName, price: updatedPrice };

            $.ajax({
                type: 'PUT',
                url: '/api/product/' + productId + '/update',
                data: updatedProduct,
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                },
                success: function (response) {
                    console.log(response.message);
                    $('#product-details p strong:contains("Name:")').next().text(updatedName);
                    $('#product-details p strong:contains("Price:")').next().text(updatedPrice);

                    $('#update-product-name').val('');
                    $('#update-product-price').val('');
                },
                error: function (error) {
                    console.error('Error updating the product:', error.responseJSON.message);
                }
            });
        }
    });
    $('#product-details').on('click', '#delete-product', function () {
        var productId = $(this).data('id');

        if (confirm("Are you sure you want to delete this product?")) {
            $.ajax({
                type: 'DELETE',
                url: '/api/product/' + productId + '/delete',
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                },
                success: function (response) {
                    console.log(response.message);
                    $('#product-details').html('').hide();
                },
                error: function (error) {
                    console.error('Error deleting the product:', error.responseJSON.message);
                }
            });
        }
    });

});
