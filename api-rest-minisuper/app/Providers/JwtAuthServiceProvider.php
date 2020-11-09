<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\JwtAuth;

class JwtAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(JwtAuth::class, function ($app) {
            return new JwtAuth();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
