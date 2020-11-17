<?php

/**
 * Author: OCHOA HERNANDEZ CHRISTIAN YESAEL
 */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class verifyPermissionsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $verifyToken = $jwtAuth->isAdmin($token);
        
        if ($verifyToken) {
            
            return $next($request);
            
        }
        else {
            
            $response = array (
                'message'   =>  'Invalid token',
                'code'      =>  400
            );
            
            return response()->json($response, $response['code']);
            
        }
        
    }
}
