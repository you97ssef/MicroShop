<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Models\User;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->post('/login', 'AuthController@login');
$router->post('/register', 'AuthController@register');

$router->get('/user', ['middleware' => 'auth:' . User::USER, 'uses' => 'AuthController@verify']);
$router->get('/admin', ['middleware' => 'auth:' . User::ADMIN, 'uses' => 'AuthController@verify']);
$router->get('/shipper', ['middleware' => 'auth:' . User::SHIPPER, 'uses' => 'AuthController@verify']);
