<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SetupApp extends Command
{
    use ConfirmableTrait;

    protected $signature = 'setup';

    protected $description = 'Set the application key';

    public function handle()
    {
        $appKey = $this->generateRandomKey();
        $jwtSecret = $this->generateRandomKey(false);

        $this->setValueInEnvironmentFile('APP_KEY', $appKey);
        $this->setValueInEnvironmentFile('JWT_SECRET', $jwtSecret);

        $this->setValueInEnvironmentFile('APP_DEBUG', 'false');
        $this->setValueInEnvironmentFile('APP_ENV', 'production');

        Log::info('Application setup successfully.');

        $this->info('Application setup successfully.');
    }

    protected function generateRandomKey(bool $appKey = true)
    {
        return $appKey ? 'base64:' . base64_encode(random_bytes(
            $this->laravel['config']['app.cipher'] == 'AES-128-CBC' ? 16 : 32
        )) : Str::random(32); 
    }

    protected function setValueInEnvironmentFile($key, $value)
    {
        file_put_contents($this->laravel->basePath('.env'), preg_replace(
            $this->keyReplacementPattern($key),
            $key . '=' . $value,
            file_get_contents($this->laravel->basePath('.env'))
        ));
    }

    protected function keyReplacementPattern($key)
    {
        $escaped = preg_quote('=' . env($key), '/');

        return "/^{$key}{$escaped}/m";
    }
}