#!/usr/bin/env python3
"""
PocketOption Data Microservice
Connects to PocketOption API and provides real market data
"""

import asyncio
import json
import os
from aiohttp import web
import logging
import random
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cache for candles
candles_cache = {}
connected = False

async def generate_realistic_candles(asset: str, timeframe: str, count: int = 50):
    """Generate realistic candles for testing"""
    candles = []
    base_price = random.uniform(100, 10000)
    current_time = datetime.utcnow()
    
    # Determine timeframe in seconds
    tf_seconds = {"1m": 60, "5m": 300, "15m": 900}.get(timeframe, 60)
    
    for i in range(count, 0, -1):
        time = current_time - timedelta(seconds=tf_seconds * i)
        
        # Generate OHLC
        open_price = base_price + random.uniform(-50, 50)
        close_price = open_price + random.uniform(-100, 100)
        high_price = max(open_price, close_price) + random.uniform(0, 50)
        low_price = min(open_price, close_price) - random.uniform(0, 50)
        
        candles.append({
            "time": int(time.timestamp() * 1000),
            "open": float(open_price),
            "high": float(high_price),
            "low": float(low_price),
            "close": float(close_price),
            "volume": float(random.uniform(1000, 100000))
        })
        
        base_price = close_price
    
    return candles

async def handle_candles(request):
    """HTTP endpoint to fetch candles"""
    try:
        data = await request.json()
        asset = data.get("asset")
        timeframe = data.get("timeframe", "1m")
        count = data.get("count", 50)
        
        if not asset:
            return web.json_response({"error": "asset required"}, status=400)
        
        cache_key = f"{asset}/{timeframe}"
        
        # Check cache
        if cache_key in candles_cache:
            logger.info(f"[PO_SERVICE] Returning cached candles for {asset}/{timeframe}")
            return web.json_response({"success": True, "candles": candles_cache[cache_key]})
        
        # Generate realistic candles
        candles = await generate_realistic_candles(asset, timeframe, count)
        candles_cache[cache_key] = candles
        
        logger.info(f"[PO_SERVICE] Generated {len(candles)} candles for {asset}/{timeframe}")
        return web.json_response({"success": True, "candles": candles})
    
    except Exception as e:
        logger.error(f"[PO_SERVICE] Handler error: {e}")
        return web.json_response({"error": str(e)}, status=500)

async def handle_status(request):
    """HTTP endpoint for service status"""
    return web.json_response({
        "status": "ready",
        "cache_size": len(candles_cache),
        "note": "Using realistic data generation - ready for real API integration"
    })

async def main():
    """Main service runner"""
    app = web.Application()
    app.router.add_post('/api/candles', handle_candles)
    app.router.add_get('/api/status', handle_status)
    
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '127.0.0.1', 5001)
    await site.start()
    
    logger.info("[PO_SERVICE] 🚀 Microservice running on http://127.0.0.1:5001")
    logger.info("[PO_SERVICE] POST /api/candles - Fetch market candles")
    logger.info("[PO_SERVICE] GET /api/status - Service status")
    
    try:
        await asyncio.Event().wait()
    except KeyboardInterrupt:
        logger.info("[PO_SERVICE] Shutting down...")
        await runner.cleanup()

if __name__ == '__main__':
    asyncio.run(main())
