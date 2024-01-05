import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface CTA {
  label: string;
  href: string;
}

export interface OpenGraphConfig {
  ogTitle?: string;
  ogUrl?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface CatalogConfig {
  title: string;
  tagline: string;
  homepageLink?: string;
  organizationName: string;
  homepageLink: string;
  openGraph?: OpenGraphConfig;
}

export interface Resource {
  catalog: {
    parent: string;
    path: string;
    updatedAt: string;
  };
  service: string;
  name?: string;
  description?: string;
  AWS: LambdaAWSResource | StepFunctionAWSResource;
  owners?: string[];
}

export interface LambdaAWSResource {
  Arn: string;
  LastModified: string;
  FunctionName: string;
  MemorySize: number;
  Runtime: string;
  Handler: string;
  CodeSize: number;
  Service: "lambda";
}
export interface StepFunctionAWSResource {
  Arn: string;
  Name: string | undefined;
  Status: string | undefined;
  CreationDate: string | undefined;
  Type: string | undefined;
  LoggingConfiguration: LogLevel | undefined;
  Account: string;
  Service: "step-function";
}

export interface LambdaResource extends Resource {
  AWS: LambdaAWSResource;
}
export interface StepFunctionResource extends Resource {
  AWS: StepFunctionAWSResource;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  resources?: Resource[];
  source: MDXRemoteSerializeResult;
  owners?: string[];
}

export interface User {
  id: string;
  type: "user";
  name: string;
  avatarUrl: string;
  role: string;
  summary: string;
  teams?: string[];
}

export interface Team {
  id: string;
  type: "team";
  name: string;
  avatarUrl: string;
  summary: string;
  slackChannel?: string;
  source: MDXRemoteSerializeResult;
}
