# Chỉnh chỉ số quy mô Mind41

Số liệu hiện tại là **dummy, chưa kiểm chứng**, không phải benchmark hoặc SLA.

Nguồn số liệu dùng chung: `public/assets/capacity-data.json`. Trang chính và `/v2/` đều đọc file này. `/v1/` được giữ nguyên.

| Trường | Ý nghĩa | Giá trị mẫu |
| --- | --- | ---: |
| documentsPerDay | Văn bản cần xử lý mỗi ngày làm việc | 100 |
| pagesPerBatch | Tổng trang trong một lô gửi cùng lúc, không phải số trang xử lý song song | 500 |
| concurrentUsers | Người dùng đồng thời, không phải số tác vụ AI đồng thời | 20 |
| documentsPerYear | Văn bản mới trung bình mỗi năm | 26000 |
| existingDocuments | Số văn bản trong kho có sẵn trước triển khai | 100000 |

## Quy trình bàn giao

1. Mở khối “Quy mô triển khai” trên landing, mở “Đội sản phẩm: chỉnh thử các chỉ số minh họa”.
2. Nhập 5 giá trị nguyên dương, chọn “Áp dụng xem trước”. Chỉnh thử không cập nhật bản công khai và không lưu vĩnh viễn.
3. Chọn “Xuất số liệu JSON”, gửi file cho người quản trị hoặc thay `public/assets/capacity-data.json` trong GitHub.
4. Commit lên `main` để hệ thống tự triển khai. Tải lại trang để đọc số liệu mới.

Kịch bản mẫu 26000 văn bản/năm tương ứng 100/ngày × 260 ngày làm việc. Trường năm được nhập độc lập, không tự tính vì có thể là số thống kê riêng.

## Trước khi công bố số liệu thực

Đội sản phẩm cần ghi lại cấu hình CPU/GPU/RAM/storage, phiên bản mô hình, loại tác vụ, số trang trung bình, tỷ lệ OCR, số tác vụ đồng thời và thời gian đáp ứng mục tiêu. Phân biệt tải đầu vào của đơn vị với năng lực xử lý đo được của hệ thống.

Đổi số trong JSON **không tự bỏ nhãn giả lập**. Khi có kiểm chứng, cần rà soát nhãn, mô tả, điều kiện đo và ví dụ trong cả `public/index.html` và `public/v2/index.html` trước khi cập nhật lời quảng bá. Không dùng bản chỉnh thử làm chứng nhận hiệu năng.
