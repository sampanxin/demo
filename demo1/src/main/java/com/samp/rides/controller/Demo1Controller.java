package com.samp.rides.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.samp.rides.util.RedisCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/2/4.
 */

@Controller
@RequestMapping("/demo")
public class Demo1Controller {


    private static Logger logger = LoggerFactory.getLogger(Demo1Controller.class);

    @Autowired
    private RedisCache redisCache;


    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    @ResponseBody
    public ResponseEntity<Object> login(HttpServletRequest request, String loginName, String pwd){
        request.getSession().setAttribute("loginName",loginName);
        String json = "{status:'ok'}";
        JsonObject returnData = new JsonParser().parse(json).getAsJsonObject();
        returnData.addProperty("success", true);
        //  redisCache.putCacheWithExpireTime("Test","TestValue",RedisCache.CAHCETIME);
        return new ResponseEntity<Object>(returnData.toString(), HttpStatus.OK);
    }


    @RequestMapping(value = "/getLogin", method = {RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<Object>  getLogin(HttpServletRequest request){
        String userName= (String)request.getSession().getAttribute("loginName");
        String json = "{status:'"+(userName==null?"":userName)+"'}";
        JsonObject returnData = new JsonParser().parse(json).getAsJsonObject();
        returnData.addProperty("success", true);
        logger.info("loginName:{}",userName);
        //logger.info("Test:{}",redisCache.getCache("Test",String.class));
        return new ResponseEntity<Object>(returnData.toString(), HttpStatus.OK);
    }


    @RequestMapping(value = "/sendSms", method = {RequestMethod.GET})
    @ResponseBody
    public ResponseEntity<Object> sendsms(String smsPhone) {
        String redisKey = "SMS_LIMIT_" + smsPhone;
        String value = redisCache.getCache(redisKey, String.class);
        if (value == null) {
            //设置有效期一分钟
            redisCache.putCacheWithExpireTime(redisKey, "1", RedisCache.CAHCETIME);
        }
        String json = "{msg:'已发送'}";
        if (value != null ) {
            json = "{msg:'每分钟只能发送一次短信'}";
        }
        JsonObject returnData = new JsonParser().parse(json).getAsJsonObject();
        returnData.addProperty("success", true);
        logger.info("sms:{}",returnData.toString());
        return new ResponseEntity<Object>(returnData.toString(), HttpStatus.OK);
    }
}
