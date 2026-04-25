#include <iostream>
#include <string>
using namespace std;

class Node {
public:
    string namaBuah;
    int harga;
    Node* next;
    Node* prev;
};

class LinkedList {
private:
    Node* head;
    Node* tail;

public:
    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    void tambahDepan(string nama, int harga) {
        Node* baru = new Node();
        baru->namaBuah = nama;
        baru->harga = harga;
        baru->next = head;
        baru->prev = nullptr;

        if (head != nullptr)
            head->prev = baru;
        else
            tail = baru;

        head = baru;
    }

    void tambahBelakang(string nama, int harga) {
        Node* baru = new Node();
        baru->namaBuah = nama;
        baru->harga = harga;
        baru->next = nullptr;
        baru->prev = tail;

        if (tail != nullptr)
            tail->next = baru;
        else
            head = baru;

        tail = baru;
    }

    void bacaMaju() {
        if (head == nullptr) {
            cout << "List kosong.\n";
            return;
        }
        Node* bantu = head;
        cout << "Isi list (maju):\n";
        while (bantu != nullptr) {
            cout << "- " << bantu->namaBuah << " : Rp" << bantu->harga << endl;
            bantu = bantu->next;
        }
    }

    void bacaMundur() {
        if (tail == nullptr) {
            cout << "List kosong.\n";
            return;
        }
        Node* bantu = tail;
        cout << "Isi list (mundur):\n";
        while (bantu != nullptr) {
            cout << "- " << bantu->namaBuah << " : Rp" << bantu->harga << endl;
            bantu = bantu->prev;
        }
    }

    void cariBuah(string nama) {
        Node* bantu = head;
        while (bantu != nullptr) {
            if (bantu->namaBuah == nama) {
                cout << "Buah ditemukan: " << bantu->namaBuah << " dengan harga Rp" << bantu->harga << endl;
                return;
            }
            bantu = bantu->next;
        }
        cout << "Buah tidak ditemukan.\n";
    }
};

int main() {
    LinkedList daftarBuah;
    int pilihan;
    string nama;
    int harga;

    do {
        cout << "\n=== MENU ===\n";
        cout << "1. Tambah buah di depan\n";
        cout << "2. Tambah buah di belakang\n";
        cout << "3. Baca list maju\n";
        cout << "4. Baca list mundur\n";
        cout << "5. Cari buah\n";
        cout << "0. Keluar\n";
        cout << "Pilih: ";
        cin >> pilihan;
        cin.ignore();

        switch (pilihan) {
        case 1:
            cout << "Masukkan nama buah: ";
            getline(cin, nama);
            cout << "Masukkan harga: ";
            cin >> harga;
            daftarBuah.tambahDepan(nama, harga);
            break;

        case 2:
            cout << "Masukkan nama buah: ";
            getline(cin, nama);
            cout << "Masukkan harga: ";
            cin >> harga;
            daftarBuah.tambahBelakang(nama, harga);
            break;

        case 3:
            daftarBuah.bacaMaju();
            break;

        case 4:
            daftarBuah.bacaMundur();
            break;

        case 5:
            cout << "Masukkan nama buah yang dicari: ";
            getline(cin, nama);
            daftarBuah.cariBuah(nama);
            break;

        case 0:
            cout << "Keluar program.\n";
            break;

        default:
            cout << "Pilihan tidak valid.\n";
        }
    } while (pilihan != 0);

    return 0;
}
