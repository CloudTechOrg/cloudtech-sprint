# スプリント7：Terraform ハンズオン課題

## 背景

あなたは、とあるWebサービスを運営する企業で、インフラエンジニアとして働いています。

これまでのスプリントでは、AWSマネジメントコンソールを使用して手動でインフラを構築してきました。しかし、手動構築には以下の課題があります。

- 構築手順が属人化しやすい
- 環境の再現が難しい
- 構成変更の履歴管理ができない
- 複数環境（開発・ステージング・本番）の管理が煩雑

これらの課題を解決するため、**Infrastructure as Code（IaC）** の考え方を導入し、**Terraform**を使用してインフラをコードで管理することになりました。

あなたはインフラエンジニアとして、過去のスプリントで構築した環境をTerraformでコード化する必要があります。

## 実施手順

1. Terraformで構築するスプリント課題を選択しましょう。
2. 選択したスプリントの要件を満たすTerraformコードを作成しましょう。
3. `terraform apply` でAWS環境を構築しましょう。
4. 構築が終わったら、動作確認をしていきましょう。

## プロジェクト体制

| 担当 | チーム | 役割・タスク |
| :--- | :--- | :--- |
| **あなた** | インフラチーム | ・Terraformコードの作成<br>・AWS環境構築<br>・動作確認 |
| **メンター** | 支援チーム | ・成果物のレビュー<br>・技術サポート (CloudTech Academy受講生のみ) |

## 要件

### 要件1：対象スプリントの選択
以下のスプリント課題から1つを選択し、Terraformでインフラを構築する

| スプリント | 内容 | 難易度 |
| :--- | :--- | :--- |
| Sprint1 | EC2によるWebサーバ構築 | ★☆☆ |
| Sprint2 | EC2 + RDSによるAPI・DB構成 | ★★☆ |
| Sprint3 | ELB + Auto Scalingによる冗長化構成 | ★★☆ |
| Sprint4 | S3 + CloudFrontによる静的サイト配信 | ★★☆ |
| Sprint5 | ECS/Fargate + ALB + Auto Scalingによるコンテナ構成 | ★★★ |
| Sprint6 | CodePipeline + CodeBuildによるCI/CD構成 | ★★★ |

※ 難易度は目安です。自身のスキルアップに合わせて選択してください。

### 要件2：Terraformコードの作成
- 選択したスプリントの要件を満たすTerraformコードを作成する
- コードはGitHubリポジトリで管理する
- 適切にファイルを分割し、可読性の高いコードにする

### 要件3：動作確認
- `terraform apply` でエラーなく環境が構築できる
- 選択したスプリントの動作確認が正常に行える

## ヒント

### ファイル構成例
```
.
├── main.tf          # メインのリソース定義
├── variables.tf     # 変数定義
├── outputs.tf       # 出力定義
├── provider.tf      # プロバイダー設定
└── terraform.tfvars # 変数の値（※.gitignoreに追加推奨）
```

### よく使うTerraformコマンド
```bash
# 初期化
terraform init

# 実行計画の確認
terraform plan

# リソースの作成
terraform apply

# リソースの削除
terraform destroy

# コードのフォーマット
terraform fmt

# 構文チェック
terraform validate
```

### 参考リソース
- [Terraform Registry - AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- CloudTech講座のTerraformセクション

## 動作確認

1. `terraform init` が正常に完了する
2. `terraform plan` でエラーが発生しない
3. `terraform apply` でリソースが作成される
4. 選択したスプリントの動作確認が成功する
5. `terraform destroy` でリソースが削除される

## トラブルシューティング

### terraform init が失敗する
- AWSの認証情報が正しく設定されているか確認してください
- `~/.aws/credentials` または環境変数（AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY）を確認してください
- プロバイダーのバージョン指定が正しいか確認してください

### terraform plan でエラーが発生する
- 構文エラーがないか `terraform validate` で確認してください
- 必須の引数が不足していないか確認してください
- リソース間の依存関係が正しいか確認してください

### terraform apply でリソース作成に失敗する
- IAMユーザーに必要な権限があるか確認してください
- リソースの制限（VPCの上限数など）に達していないか確認してください
- リージョンの設定が正しいか確認してください

### 既存リソースとの競合が発生する
- 同じ名前のリソースが既に存在していないか確認してください
- 必要に応じて、リソース名にプレフィックスやサフィックスを追加してください

### tfstateファイルの管理について
- `terraform.tfstate` にはインフラの状態が保存されます
- チーム開発では、S3バックエンドを使用してtfstateを共有管理することを推奨します
- `terraform.tfstate` には機密情報が含まれる場合があるため、Gitリポジトリにはコミットしないでください
