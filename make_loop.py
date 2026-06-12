import os
import sys
import subprocess
import glob

def print_help():
    print("SKANOPT Video Dongu Olusturucu (Ping-Pong Loop Creator)")
    print("------------------------------------------------------")
    print("Bu arac, herhangi bir videoyu kesintisiz bir donguye (ping-pong loop) donusturur")
    print("ve web sitesi icin MP4, WebM ve Poster (kapak) gorseli uretir.")
    print("\nKullanim:")
    print("  python make_loop.py <giris_videosu_yolu> <cikis_adi_turu>")
    print("\nOrnekler:")
    print("  python make_loop.py videolar/yeni_cekim.mp4 automation")
    print("  (Bu komut assets/video/automation.mp4, assets/video/automation.webm ve assets/img/automation-poster.jpg uretir.)\n")

def main():
    if len(sys.argv) < 3:
        print_help()
        sys.exit(1)

    input_video = sys.argv[1]
    output_base = sys.argv[2]

    # Handle wildcards or glob patterns if passed
    matched_files = glob.glob(input_video)
    if not matched_files:
        print(f"Hata: Giris videosu bulunamadi: {input_video}")
        sys.exit(1)
    
    input_file = matched_files[0]
    print(f"Giris videosu: {input_file}")

    # Set up destination paths
    dst_video_dir = os.path.join("assets", "video")
    dst_img_dir = os.path.join("assets", "img")
    os.makedirs(dst_video_dir, exist_ok=True)
    os.makedirs(dst_img_dir, exist_ok=True)

    out_mp4 = os.path.join(dst_video_dir, f"{output_base}.mp4")
    out_webm = os.path.join(dst_video_dir, f"{output_base}.webm")
    out_poster = os.path.join(dst_img_dir, f"{output_base}-poster.jpg")

    print("\n1. MP4 seamless ping-pong loop olusturuluyor...")
    # split and reverse concat to make loop seamless
    cmd_mp4 = [
        "ffmpeg", "-y", "-i", input_file,
        "-filter_complex", "[0:v]split[v1][v2]; [v2]reverse[v2r]; [v1][v2r]concat=n=2:v=1:a=0[outv]",
        "-map", "[outv]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-an", "-preset", "slow", "-crf", "22", out_mp4
    ]
    try:
        subprocess.run(cmd_mp4, check=True)
        print(f"-> Basariyla kaydedildi: {out_mp4}")
    except Exception as e:
        print(f"Hata (MP4 olusturulurken): {e}")
        sys.exit(1)

    print("\n2. WebM formatina donusturuluyor...")
    cmd_webm = [
        "ffmpeg", "-y", "-i", input_file,
        "-filter_complex", "[0:v]split[v1][v2]; [v2]reverse[v2r]; [v1][v2r]concat=n=2:v=1:a=0[outv]",
        "-map", "[outv]", "-c:v", "libvpx-vp9", "-b:v", "1M", "-crf", "30", "-an", out_webm
    ]
    try:
        subprocess.run(cmd_webm, check=True)
        print(f"-> Basariyla kaydedildi: {out_webm}")
    except Exception as e:
        print(f"Hata (WebM olusturulurken): {e}")

    print("\n3. Poster (kapak) gorseli olusturuluyor...")
    # Extract the first frame of the generated MP4
    cmd_poster = [
        "ffmpeg", "-y", "-i", out_mp4, "-vframes", "1", "-update", "1", out_poster
    ]
    try:
        subprocess.run(cmd_poster, check=True)
        print(f"-> Basariyla kaydedildi: {out_poster}")
    except Exception as e:
        print(f"Hata (Poster olusturulurken): {e}")

    print("\nIslem tamamlandi! Sitedeki video ve kapak gorseli basariyla guncellendi.")
    print("Tarayicinizda degisiklikleri gormek icin Ctrl + F5 yapmayi unutmayin.")

if __name__ == "__main__":
    main()
