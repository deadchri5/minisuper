<?php

/*
 * Author: CHRISTIAN YESAEL OCHOA HERNANDEZ. 
 *  */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyWebToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $isTokenValid = $jwtAuth->checkToken($token);
        
        if ($isTokenValid) {
            return $next($request);
        }
        
        $response = array (
            'message'   =>  'El token de usuario no es valido.',
            'code'  =>  400
        );
        
        return response()->json($response, $response['code']);
        
    }
}
