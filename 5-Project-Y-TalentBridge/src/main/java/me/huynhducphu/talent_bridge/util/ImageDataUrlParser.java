package me.huynhducphu.talent_bridge.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.exception.custom.InvalidImageDataException;

import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Admin 6/24/2025
 **/
public class ImageDataUrlParser {
    private static final Pattern BASE64_IMAGE_PATTERN = Pattern.compile("^data:image/(png|jpeg|jpg|gif|bmp);base64,([a-zA-Z0-9+/=\\r\\n]+)$");

    public static ParsedImage parse(String base64) {
        if (base64 == null)
            throw new InvalidImageDataException("Chuỗi base64 không được null");

        Matcher matcher = BASE64_IMAGE_PATTERN.matcher(base64);
        if (!matcher.matches())
            throw new InvalidImageDataException("Chuỗi base64 không đúng định dạng data:image/...;base64,...");

        String format = matcher.group(1);
        String base64Data = matcher.group(2);

        byte[] data;
        try {
            data = Base64.getDecoder().decode(base64Data);
        } catch (IllegalArgumentException e) {
            throw new InvalidImageDataException("Phần dữ liệu base64 không hợp lệ");
        }

        return new ParsedImage("image/" + format, data);
    }

    public static String toBase64DataUrl(String contentType, byte[] data) {
        return "data:" + contentType + ";base64," + Base64.getEncoder().encodeToString(data);
    }


    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class ParsedImage {
        private String contentType;
        private byte[] data;
    }

}
