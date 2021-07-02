/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author acer
 */
public class DBApi {

    static Connection con;
    static ResultSet rs;

    public static JSONObject registerNewUser(String email, String password) {
        JSONObject jo = new JSONObject();
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) {//user already exists
                jo.put("status", 1);
            } else { //not yet exists, add user into table
                sql = "insert into register(email,password) values(?,?)";
                PreparedStatement ps2 = con.prepareStatement(sql);
                ps2.setString(1, email);
                ps2.setString(2, password);
                ps2.executeUpdate();
                jo.put("status", 0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject userAuthentication(String email, String pass) {
        JSONObject jo = new JSONObject();
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email = ? and password = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, pass);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) {//user already exists
                jo.put("status", 1);
            } else { //not yet exists, add user into table
                jo.put("status", 0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }
    
    
    public static JSONArray getMemoryDataByOwner(String email) {
        JSONArray ja = new JSONArray();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from memory where owneremail=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                JSONObject jo = new JSONObject();
                jo.put("id", rs.getString("id"));
                jo.put("title", rs.getString("title"));
                jo.put("category", rs.getString("category"));
                jo.put("date", rs.getString("date"));
                ja.add(index++, jo);
            }
            if (ada == 1) {//ada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 1);
                ja.add(index++, jo);
            } else {//tiada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 0);
                ja.add(index++, jo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ja;
    }
    
    public static JSONObject addMemory(String title, String category,String owneremail) {
        JSONObject jo = new JSONObject();
        try {
            con = ConMan.getConnection();
            String sql = "insert into memory (title,category,owneremail) values (?,?,?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, title);
            ps.setString(2, category);
            ps.setString(3, owneremail);
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject getMemoryDataById(String id) {
        JSONObject jo = new JSONObject();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from memory where id= ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, id);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                jo.put("id", rs.getString("id"));
                jo.put("title", rs.getString("title"));
                jo.put("category", rs.getString("category"));
                jo.put("date", rs.getString("date"));
            }
            if (ada == 1) {//ada data contacts
                jo.put("status", 1);
            } else {//tiada data contacts
                jo.put("status", 0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }
    
      
    public static JSONObject updateMemoryById(String title, String category,String id) {
        JSONObject jo = new JSONObject();
        try {
            con = ConMan.getConnection();
            String sql = "update memory set title=?, category=? where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, title);
            ps.setString(2, category);
            ps.setString(3, id);
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject delMemoryById(String id) {
        JSONObject jo = new JSONObject();

        try {
            con = ConMan.getConnection();
            String sql = "delete from memory  where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, id);
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }
     
    public static JSONArray getProfileDataByOwner(String email) {
        JSONArray ja = new JSONArray();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email= ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                JSONObject jo = new JSONObject();
                jo.put("email", rs.getString("email"));
                jo.put("password", rs.getString("password"));
                ja.add(index++, jo);
            }
            if (ada == 1) {//ada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 1);
                ja.add(index++, jo);
            } else {//tiada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 0);
                ja.add(index++, jo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ja;
    }
   
    
    
    
    
}